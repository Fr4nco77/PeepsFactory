import { peepParts } from "../data/options.js";

export interface Asset {
  category: keyof typeof peepParts;
  name: string;
  position: string;
  backgroundColor?: string;
  inkColor?: string;
}
export interface Peep {
  head?: (typeof peepParts.heads)[number];
  hairColor?: string;
  face?: (typeof peepParts.faces)[number];
  skinColor?: string;
  facialHair?: (typeof peepParts.facialHair)[number];
  accessories?: (typeof peepParts.accessories)[number];
  background?: string;
}

export interface PeepGenerationOptions {
  peep?: Peep;
  seed?: string;
  enableAccessories?: boolean;
  enableFacialHair?: boolean;
  enableColors?: boolean;
  enableBackground?: boolean;
}
