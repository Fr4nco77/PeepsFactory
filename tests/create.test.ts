import { describe, it, expect } from "vitest";
import { createPeep } from "../src/core/generator";
import { randomPeep } from "../src/core/randomizer";

describe("createPeep", () => {
  it("devuelve un string svg", () => {
    const peep = randomPeep();
    const svg = createPeep(peep, "#eee");
    expect(svg).toContain("<svg");
    expect(svg).toContain("</svg>");
  });
});
