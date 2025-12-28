import { describe, it, expect } from "vitest";
import { toPNG, toJPEG, toWebP, toAvif } from "../src/core/exporter";
import { createRandomPeep } from "../src/core/generator";

describe("Exporters", () => {
  const svg = createRandomPeep("franco123");

  it("convierte un SVG en PNG buffer", async () => {
    const buffer = await toPNG(svg);
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });
  
  it("convierte un SVG en JPEG buffer", async () => {
    const buffer = await toJPEG(svg);
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it("convierte un SVG en WebP buffer", async () => {
    const buffer = await toWebP(svg);
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });

  it("convierte un SVG en AVIF buffer", async () => {
    const buffer = await toAvif(svg);
    expect(buffer).toBeInstanceOf(Buffer);
    expect(buffer.length).toBeGreaterThan(0);
  });
});
