/// <reference path="../vect.d.ts" />
/// <reference path="./base.d.ts" />
declare namespace cp {
  export function circleSegmentQuery(shape: Shape, center: Vect, r: number, a: Vect, b: Vect): SegmentQueryInfo;
}