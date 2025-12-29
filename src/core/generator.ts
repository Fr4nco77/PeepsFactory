import { generatePeepAvatar } from "./randomizer.js";
import { loadAsset } from "./utils.js";
import type { PeepGenerationOptions } from "./types.ts";

// Crea un avatar tipo "peep" y devuelve el SVG como string.
export function createPeep({
  peep,
  seed,
  enableAccessories,
  enableFacialHair,
  enableColors,
  enableBackground,
}: PeepGenerationOptions = {}): string {
  // Genera las partes del avatar (cabeza, cara, colores, etc.)
  const {
    head,
    hairColor,
    face,
    skinColor,
    facialHair,
    accessories,
    background,
  } = generatePeepAvatar({
    peep,
    seed,
    enableAccessories,
    enableFacialHair,
    enableColors,
    enableBackground,
  });

  // Comienza el SVG base
  let svg = `<svg width="600px" height="600px" viewBox="0 0 600 600" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">`;

  // Si está habilitado, agrega un rectángulo de fondo
  if (enableBackground) {
    svg += ` <rect width="100%" height="100%" fill="${background}" />`;
  }

  // Renderiza la cabeza
  svg += loadAsset({
    category: "heads",
    name: head!,
    position: "63.5, 31.25",
    backgroundColor: skinColor,
    inkColor: hairColor,
  });

  // Renderiza la cara
  svg += loadAsset({ category: "faces", name: face!, position: "220, 215" });

  // Renderiza accesorios si están habilitados
  if (enableAccessories)
    svg += loadAsset({
      category: "accessories",
      name: accessories!,
      position: "115, 270",
    });

  // Renderiza vello facial si está habilitado
  if (enableFacialHair)
    svg += loadAsset({
      category: "facialHair",
      name: facialHair!,
      position: "188, 370",
      inkColor: hairColor,
    });

  // Cierra el SVG
  svg += `</svg>`;

  return svg;
}
