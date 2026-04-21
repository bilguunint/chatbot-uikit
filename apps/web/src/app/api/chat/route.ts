import type { NextRequest } from "next/server";

export const runtime = "edge";

type ChatRole = "user" | "assistant" | "system";

interface IncomingMessage {
  role: ChatRole;
  content: string;
}

type Provider = "openai" | "anthropic" | "gemini";

interface ChatRequestBody {
  messages?: IncomingMessage[];
  provider?: Provider;
  model?: string;
}

const SYSTEM_PROMPT =
  "You are a helpful AI assistant inside a chat UI. Reply in the same language as the user. Keep answers concise and well formatted.";

const DEFAULTS: Record<Provider, string> = {
  openai: process.env.OPENAI_MODEL ?? "gpt-4o-mini",
  anthropic: process.env.ANTHROPIC_MODEL ?? "claude-3-5-sonnet-latest",
  gemini: process.env.GEMINI_MODEL ?? "gemini-1.5-flash-latest",
};

function jsonError(message: string, status = 400, detail?: unknown) {
  return new Response(JSON.stringify({ error: message, detail }), {
    status,
    headers: { "Content-Type": "application/json" },
  });
}

function streamHeaders() {
  return {
    "Content-Type": "text/plain; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    "X-Accel-Buffering": "no",
  };
}

export async function POST(req: NextRequest) {
  let body: ChatRequestBody;
  try {
    body = (await req.json()) as ChatRequestBody;
  } catch {
    return jsonError("Invalid JSON body");
  }

  const messages = Array.isArray(body.messages) ? body.messages : [];
  if (messages.length === 0) return jsonError("messages is required");

  const provider: Provider = body.provider ?? "openai";
  const model = body.model ?? DEFAULTS[provider];

  try {
    switch (provider) {
      case "openai":
        return await streamOpenAI(messages, model);
      case "anthropic":
        return await streamAnthropic(messages, model);
      case "gemini":
        return await streamGemini(messages, model);
      default:
        return jsonError(`Unsupported provider: ${provider}`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : "Unknown error";
    return jsonError(message, 500);
  }
}

// ---------------------------------------------------------------------------
// OpenAI (Chat Completions, SSE)
// ---------------------------------------------------------------------------
async function streamOpenAI(messages: IncomingMessage[], model: string) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return jsonError("OPENAI_API_KEY is not configured on the server.", 500);

  const upstream = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      stream: true,
      messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    return jsonError(`OpenAI request failed (${upstream.status})`, 502, text);
  }

  return new Response(
    sseToTextStream(upstream.body, (data) => {
      try {
        const json = JSON.parse(data) as {
          choices?: Array<{ delta?: { content?: string } }>;
        };
        return json.choices?.[0]?.delta?.content ?? "";
      } catch {
        return "";
      }
    }),
    { headers: streamHeaders() },
  );
}

// ---------------------------------------------------------------------------
// Anthropic (Messages API, SSE)
// ---------------------------------------------------------------------------
async function streamAnthropic(messages: IncomingMessage[], model: string) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return jsonError("ANTHROPIC_API_KEY is not configured on the server.", 500);

  // Anthropic expects only user/assistant in messages; system prompt is a top-level field.
  const userAssistant = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({ role: m.role, content: m.content }));

  const upstream = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model,
      stream: true,
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      messages: userAssistant,
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    return jsonError(`Anthropic request failed (${upstream.status})`, 502, text);
  }

  return new Response(
    sseToTextStream(upstream.body, (data) => {
      try {
        const json = JSON.parse(data) as {
          type?: string;
          delta?: { type?: string; text?: string };
        };
        if (json.type === "content_block_delta" && json.delta?.type === "text_delta") {
          return json.delta.text ?? "";
        }
        return "";
      } catch {
        return "";
      }
    }),
    { headers: streamHeaders() },
  );
}

// ---------------------------------------------------------------------------
// Google Gemini (generativelanguage v1beta, SSE via alt=sse)
// ---------------------------------------------------------------------------
async function streamGemini(messages: IncomingMessage[], model: string) {
  const apiKey = process.env.GEMINI_API_KEY ?? process.env.GOOGLE_API_KEY;
  if (!apiKey) return jsonError("GEMINI_API_KEY is not configured on the server.", 500);

  // Gemini uses "user" and "model" roles. System prompt goes in systemInstruction.
  const contents = messages
    .filter((m) => m.role !== "system")
    .map((m) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(
    model,
  )}:streamGenerateContent?alt=sse&key=${encodeURIComponent(apiKey)}`;

  const upstream = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      systemInstruction: { role: "user", parts: [{ text: SYSTEM_PROMPT }] },
      contents,
    }),
  });

  if (!upstream.ok || !upstream.body) {
    const text = await upstream.text().catch(() => "");
    return jsonError(`Gemini request failed (${upstream.status})`, 502, text);
  }

  return new Response(
    sseToTextStream(upstream.body, (data) => {
      try {
        const json = JSON.parse(data) as {
          candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }>;
        };
        const parts = json.candidates?.[0]?.content?.parts ?? [];
        return parts.map((p) => p.text ?? "").join("");
      } catch {
        return "";
      }
    }),
    { headers: streamHeaders() },
  );
}

// ---------------------------------------------------------------------------
// Shared SSE → plain-text token stream helper
// ---------------------------------------------------------------------------
function sseToTextStream(
  source: ReadableStream<Uint8Array>,
  extractDelta: (data: string) => string,
): ReadableStream<Uint8Array> {
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  return new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = source.getReader();
      let buffer = "";
      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) break;
          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split("\n");
          buffer = lines.pop() ?? "";

          for (const rawLine of lines) {
            const line = rawLine.trim();
            if (!line.startsWith("data:")) continue;
            const data = line.slice(5).trim();
            if (!data || data === "[DONE]") continue;
            const delta = extractDelta(data);
            if (delta) controller.enqueue(encoder.encode(delta));
          }
        }
      } catch (err) {
        controller.error(err);
        return;
      }
      controller.close();
    },
  });
}
