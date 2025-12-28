export interface PeepAvatar {
  head: string;
  face: string;
  facialHair?: string;
  accesories?: string;
}

export interface CreatePeepAttr {
  peep: PeepAvatar;
  background?: string;
  format: "svg" | "png" | "jpeg" | "webp" | "avif";
}
