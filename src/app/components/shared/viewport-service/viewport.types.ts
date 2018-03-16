export enum Breakpoints {
  XL = 'XL',
  LG = 'LG',
  MD = 'MD',
  SM = 'SM',
  XS = 'XS',
}

export const compactModes = [
  Breakpoints.XS,
  Breakpoints.SM,
  Breakpoints.MD,
];

export class Dimensions {
  constructor(
    public width: number = 0,
    public height: number = 0
  ) { }
}

export class Viewport {
  constructor(
    public breakpoint: Breakpoints = Breakpoints.XL,
    public dimensions: Dimensions = new Dimensions()) {
  }
}