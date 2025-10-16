/// <reference path="../body.d.ts" />
/// <reference path="../vect.d.ts" />
/// <reference path="./base.d.ts" />

declare namespace cp {
  export class SegmentShape extends Shape {
    a: Vect;
    b: Vect;
    n: Vect;
    ta: Vect;
    tb: Vect;
    tn: Vect;
    r: number;
    tangentA: Vect;
    tangentB: Vect;
    constructor(body: Body, a: Vect, b: Vect, r: number);
    cacheData(p: Vect, rot: Vect): void;
    nearestPointQuery(p: Vect): NearestPointQueryInfo;
    segmentQuery(a: Vect, b: Vect): SegmentQueryInfo;
    setNeighbors(prev: Vect, next: Vect): void;
    setEndpoints(a: Vect, b: Vect): void;
  }
}