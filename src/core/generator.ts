import fs from "fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import type { PeepAvatar } from "./types.ts";
import { randomPeep } from "./randomizer.js";

export function createPeep(peep: PeepAvatar, background?: string): string {
  const { head, face, facialHair, accesories } = peep;

  let svg = `<svg width="473px" height="567px" viewBox="0 0 473 567" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`;
  if (background)
    svg += ` <rect width="100%" height="100%" fill="${background}" />`;

  svg += loadAsset("head", head);
  svg += loadAsset("face", face, "155, 185");
  if (accesories) svg += loadAsset("accessories", accesories, "45, 245");
  if (facialHair) svg += loadAsset("facial-hair", facialHair, "120, 335");
  svg += `</svg>`;

  return svg;
}

export function createRandomPeep(seed?: string, background?: string): string {
  const peep = randomPeep(seed);
  return createPeep(peep, background);
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function loadAsset(
  category: string,
  name: string,
  position?: string,
): string {
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

  if (position) {
    // Insertar transform en el primer <g>
    raw = raw.replace(/<g([^>]*)>/, `<g$1 transform="translate(${position})">`);
  }

  return raw;
}
