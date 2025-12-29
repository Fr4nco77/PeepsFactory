import { describe, it, expect } from "vitest";
import { generatePeepAvatar } from "../src/core/randomizer";

describe("randomPeep", () => {
  it("genera el mismo peep con el mismo seed", () => {
    const peep1 = generatePeepAvatar({ seed: "franco123" });
    const peep2 = generatePeepAvatar({ seed: "franco123" });
    expect(peep1).toEqual(peep2);
  });

  it("genera peeps distintos con seeds distintos", () => {
    const peep1 = generatePeepAvatar({ seed: "franco123" });
    const peep2 = generatePeepAvatar({ seed: "otroSeed" });
    expect(peep1).not.toEqual(peep2);
  });

  it("genera peeps sin necesidad de seeds", () => {
    const peep = generatePeepAvatar();
    expect(peep).not.toBeUndefined();
    expect(peep.head).toBeDefined();
    expect(peep.face).toBeDefined();
  });
  it("incluye accesorios si enableAccessories es true", () => {
    const peep = generatePeepAvatar({ seed: "test", enableAccessories: true });
    expect(peep.accessories).toBeDefined();
  });

  it("no incluye accesorios si enableAccessories es false", () => {
    const peep = generatePeepAvatar({ seed: "test", enableAccessories: false });
    expect(peep.accessories).toBeUndefined();
  });

  it("incluye facialHair si enableFacialHair es true", () => {
    const peep = generatePeepAvatar({ seed: "test", enableFacialHair: true });
    expect(peep.facialHair).toBeDefined();
  });

  it("incluye colores si enableColors es true", () => {
    const peep = generatePeepAvatar({ seed: "test", enableColors: true });
    expect(peep.hairColor).toMatch(/^#[0-9a-f]{6}$/i);
    expect(peep.skinColor).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it("incluye background si enableBackground es true", () => {
    const peep = generatePeepAvatar({ seed: "test", enableBackground: true });
    expect(peep.background).toMatch(/^#[0-9a-f]{6}$/i);
  });

  it("respeta valores pasados en peep y no los sobrescribe", () => {
    const peep = generatePeepAvatar({
      seed: "test",
      peep: { head: "Afro", face: "Smile" },
    });
    expect(peep.head).toBe("Afro");
    expect(peep.face).toBe("Smile");
  });
});
