import sharp from "sharp";

/**
 * Convierte un string SVG en PNG
 */
export async function toPNG(svg: string): Promise<Buffer> {
  return sharp(Buffer.from(svg)).png().toBuffer();
}

/**
 * Convierte un string SVG en JPEG
 */
export async function toJPEG(svg: string): Promise<Buffer> {
  return sharp(Buffer.from(svg)).jpeg().toBuffer();
}

/**
 * Convierte un string SVG en WebP
 */
export async function toWebP(svg: string): Promise<Buffer> {
  return sharp(Buffer.from(svg)).webp().toBuffer();
}

/**
 * Convierte un string SVG en Avif
 */
export async function toWAvif(svg: string): Promise<Buffer> {
  return sharp(Buffer.from(svg)).avif().toBuffer();
}
