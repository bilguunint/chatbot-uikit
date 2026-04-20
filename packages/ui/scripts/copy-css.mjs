import { copyFileSync, mkdirSync, existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const src = resolve(__dirname, "..", "src", "styles.css");
const dest = resolve(__dirname, "..", "dist", "styles.css");

if (!existsSync(src)) {
  console.error(`[copy-css] source not found: ${src}`);
  process.exit(1);
}

mkdirSync(dirname(dest), { recursive: true });
copyFileSync(src, dest);
console.log(`[copy-css] ${src} -> ${dest}`);
