// Adds Firebase env vars to Vercel without trailing newline pollution.
const { spawnSync } = require("node:child_process");

const envs = {
  NEXT_PUBLIC_FIREBASE_API_KEY: "AIzaSyDRz4r4rh74-HglrvepYIuUKpj1XjjbbM8",
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: "swapp-mn.firebaseapp.com",
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: "swapp-mn",
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: "swapp-mn.firebasestorage.app",
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: "180778539956",
  NEXT_PUBLIC_FIREBASE_APP_ID: "1:180778539956:web:297d959aed4f8fdf6530e1",
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: "G-EG9P72MBGM",
};

const targets = ["production", "preview", "development"];

for (const [name, value] of Object.entries(envs)) {
  for (const target of targets) {
    const result = spawnSync(
      "vercel",
      ["env", "add", name, target],
      { input: value, encoding: "utf8", shell: true },
    );
    const out = (result.stdout || "") + (result.stderr || "");
    const status = result.status === 0 ? "OK" : `FAIL(${result.status})`;
    const summary = out
      .split(/\r?\n/)
      .filter((l) => /Added|already exists|Error/i.test(l))
      .join(" | ");
    console.log(`${status}  ${name}/${target}  ${summary}`);
  }
}
