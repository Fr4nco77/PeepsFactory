import sharp from "sharp";
import type { Format } from "./types.js";

// Convierte un string SVG en PNG
export async function toPNG(svg: string): Promise<Buffer> {
  return await createSharp(svg).png().toBuffer();
}

// Convierte un string SVG en JPEG
export async function toJPEG(svg: string): Promise<Buffer> {
  return await createSharp(svg).jpeg().toBuffer();
}

// Convierte un string SVG en WebP
export async function toWebP(svg: string): Promise<Buffer> {
  return await createSharp(svg).webp().toBuffer();
}

// Convierte un string SVG en Avif
export async function toAvif(svg: string): Promise<Buffer> {
  return await createSharp(svg).avif().toBuffer();
}

export async function exportTo(svg: string, format: Format): Promise<Buffer> {
  switch (format) {
    case "png":
      return toPNG(svg);

    case "jpg":
    case "jpeg":
      return toJPEG(svg);

    case "webp":
      return toWebP(svg);

    case "avif":
      return toAvif(svg);

    default:
      throw new Error(`Unsupported format: ${format}`);
  }
}

function createSharp(svg: string) {
  return sharp(Buffer.from(svg));
}
