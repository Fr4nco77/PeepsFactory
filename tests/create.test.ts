import { describe, it, expect } from "vitest";
import { createPeep } from "../src/core/generator";

describe("createPeep", () => {
  it("devuelve un string svg", () => {
    const peep = createPeep();
    expect(peep).toContain("<svg");
    expect(peep).toContain("</svg>");
  });

  it("incluye un rectángulo de background si enableBackground es true", () => {
    const svg = createPeep({ seed: "test", enableBackground: true });
    expect(svg).toContain("<rect");
    expect(svg).toMatch(/fill="#[0-9a-f]{6}"/i);
  });

  it("no incluye rectángulo de background si enableBackground es false", () => {
    const svg = createPeep({ seed: "test", enableBackground: false });
    expect(svg).not.toContain("<rect");
  });

  it("incluye accesorios si enableAccessories es true", () => {
    const svg = createPeep({ seed: "test", enableAccessories: true });
    expect(svg).toContain("accessories");
  });

  it("incluye facialHair si enableFacialHair es true", () => {
    const svg = createPeep({ seed: "test", enableFacialHair: true });
    expect(svg).toContain("facial-hair");
  });

  it("respeta valores pasados en peep y los renderiza", () => {
    const svg = createPeep({
      peep: { head: "Afro", face: "Smile" },
      seed: "test",
    });
    expect(svg).toContain("Afro");
    expect(svg).toContain("Smile");
  });

  it("incluye colores si enableColors es true", () => {
    const svg = createPeep({ seed: "test", enableColors: true });
    // hairColor y skinColor se pasan como atributos de fill
    expect(svg).toMatch(/fill="#[0-9a-f]{6}"/i);
  });
});
