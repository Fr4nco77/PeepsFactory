export interface PeepHead {
  head: string;
  face: string;
  facialHair?: string;
  accesories?: string;
}

export interface PeepBody extends PeepHead {
  body: string;
}

export interface PeepFullBody extends PeepHead {
  pose: string;
}
