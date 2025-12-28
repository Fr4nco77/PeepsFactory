import { describe, it, expect } from "vitest";
import { randomPeep } from "../src/core/randomizer";

describe("randomPeep", () => {
  it("genera el mismo peep con el mismo seed", () => {
    const peep1 = randomPeep("franco123");
    const peep2 = randomPeep("franco123");
    expect(peep1).toEqual(peep2);
  });

  it("genera peeps distintos con seeds distintos", () => {
    const peep1 = randomPeep("franco123");
    const peep2 = randomPeep("otroSeed");
    expect(peep1).not.toEqual(peep2);
  });

  it("genera peeps sin necesidad de seeds", () => {
    const peep = randomPeep();
    expect(peep).not.toBeTypeOf("undefined");
  });
});
