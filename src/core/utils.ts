import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { Asset } from "./types.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadAsset({
  category,
  name,
  position,
  backgroundColor,
  inkColor,
}: Asset): string {
  const filePath = path.join(
    __dirname,
    "..",
    "assets",
    category,
    `${name}.svg`,
  );
  let raw = fs.readFileSync(filePath, "utf-8");

  //   Quitar cabecera y <svg> raíz
  raw = raw
    .replace(/<\?xml.*?\?>/g, "")
    .replace(/<svg[^>]*>/g, "")
    .replace(/<\/svg>/g, "")
    .replace(/<title>.*<\/title>/g, "")
    .replace(/<desc>.*<\/desc>/g, "")
    .trim();

  // Insertar transform en el primer <g>
  if (position)
    raw = raw.replace(/<g([^>]*)>/, `<g$1 transform="translate(${position})">`);

  // Reemplazar fill en el path con id
  if (backgroundColor) raw = replaceFill(raw, "🎨-Background", backgroundColor);
  if (inkColor) raw = replaceFill(raw, "🖍-Ink", inkColor);

  return raw;
}

function replaceFill(raw: string, id: string, color: string) {
  return raw.replace(
    new RegExp(`(<path[^>]*id="${id}"[^>]*fill=")[^"]*"`, "g"),
    `$1${color}"`,
  );
}
