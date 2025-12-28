import type { PeepAvatar } from "./types.ts";
import { peepParts } from "../data/options.js";
const { heads, faces, accessories, facialHair } = peepParts;

// Función para crear un número pseudoaleatorio a partir de un string
function hashStringToNumber(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convertir a 32 bits
  }
  return Math.abs(hash);
}

// Función para elegir un elemento de un array usando un seed
function pick<T>(arr: T[], seed: number): T {
  return arr[seed % arr.length]!;
}

// Generador determinístico de PeepAvatar según username
export function randomPeep(randomSeed?: string): PeepAvatar {
  const seed = randomSeed
    ? hashStringToNumber(randomSeed)
    : Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

  return {
    head: pick(heads, seed),
    face: pick(faces, Math.floor(seed / 2)),
    accesories: pick(accessories, Math.floor(seed / 4)),
    facialHair: pick(facialHair, Math.floor(seed / 6)),
  };
}
