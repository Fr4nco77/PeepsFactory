import type { Peep, PeepGenerationOptions } from "./types.js";
import { peepParts } from "../data/options.js";

const { heads, faces, accessories, facialHair } = peepParts;

// Genera un PeepAvatar aleatorio o determinístico según las opciones.
export function generatePeepAvatar({
  peep,
  seed,
  enableAccessories = false,
  enableFacialHair = false,
  enableColors = false,
  enableBackground = false,
}: PeepGenerationOptions = {}): Peep {
  const currentSeed = seed
    ? stringToSeed(seed)
    : Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);

  return {
    head: peep?.head ?? pickFromArray(heads, currentSeed),
    face: peep?.face ?? pickFromArray(faces, Math.floor(currentSeed / 2)),
    ...(enableAccessories && {
      accessories:
        peep?.accessories ??
        pickFromArray(accessories, Math.floor(currentSeed / 3)),
    }),
    ...(enableFacialHair && {
      facialHair:
        peep?.facialHair ??
        pickFromArray(facialHair, Math.floor(currentSeed / 4)),
    }),
    ...(enableBackground && {
      background:
        peep?.background ?? generateHexColor(Math.floor(currentSeed / 5)),
    }),

    ...(enableColors && {
      hairColor:
        peep?.hairColor ?? generateHexColor(Math.floor(currentSeed / 6)),
      skinColor:
        peep?.skinColor ?? generateHexColor(Math.floor(currentSeed / 7)),
    }),
  };
}

// Convierte un string en un número semilla determinístico.
function stringToSeed(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0; // Convertir a 32 bits
  }
  return Math.abs(hash);
}

// Selecciona un elemento de un array usando un índice derivado de la semilla.
function pickFromArray<T>(arr: readonly T[], seed: number): T {
  return arr[seed % arr.length]!;
}

// Genera un color hex pseudoaleatorio (determinístico si se pasa seed).
function generateHexColor(seed?: number): string {
  let rand =
    seed !== undefined ? Math.abs(Math.sin(seed) * 10000) % 1 : Math.random();
  const r = Math.floor(rand * 256);

  rand =
    seed !== undefined
      ? Math.abs(Math.sin(seed + 1) * 10000) % 1
      : Math.random();
  const g = Math.floor(rand * 256);

  rand =
    seed !== undefined
      ? Math.abs(Math.sin(seed + 2) * 10000) % 1
      : Math.random();
  const b = Math.floor(rand * 256);

  return `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
}
