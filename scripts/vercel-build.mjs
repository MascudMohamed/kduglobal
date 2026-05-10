/**
 * Vercel runs `npm run build` on Linux. We copy `frontend/` → `public/`
 * so the deployed site root contains index.html, assets/, etc.
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");
const src = path.join(root, "frontend");
const dest = path.join(root, "public");

if (!fs.existsSync(src)) {
  console.error("Missing frontend/ folder.");
  process.exit(1);
}

fs.rmSync(dest, { recursive: true, force: true });
fs.mkdirSync(dest, { recursive: true });
fs.cpSync(src, dest, { recursive: true });
console.log("Build OK: copied frontend/ → public/");
