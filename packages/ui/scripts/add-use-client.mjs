import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, "..", "dist");

const targets = [
  "index.js",
  "index.cjs",
  "widgets/index.js",
  "widgets/index.cjs",
];

const DIRECTIVE_ESM = '"use client";\n';
const DIRECTIVE_CJS = '"use client";\n';

let patched = 0;
for (const rel of targets) {
  const file = resolve(distDir, rel);
  if (!existsSync(file)) {
    console.warn(`[add-use-client] skip (missing): ${rel}`);
    continue;
  }
  const src = readFileSync(file, "utf8");
  if (/^["']use client["'];?/.test(src.trimStart())) {
    continue;
  }
  const isCjs = file.endsWith(".cjs");
  // For CJS: place after "use strict" if present, otherwise at top
  let out;
  if (isCjs && src.startsWith("'use strict'")) {
    const nl = src.indexOf("\n");
    out = `'use strict';\n${DIRECTIVE_CJS}${src.slice(nl + 1)}`;
  } else {
    out = (isCjs ? DIRECTIVE_CJS : DIRECTIVE_ESM) + src;
  }
  writeFileSync(file, out);
  patched++;
  console.log(`[add-use-client] patched ${rel}`);
}
console.log(`[add-use-client] done (${patched} file(s) patched)`);
