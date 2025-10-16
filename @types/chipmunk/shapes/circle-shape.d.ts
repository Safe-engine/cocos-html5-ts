/// <reference path="../body.d.ts" />
/// <reference path="../vect.d.ts" />

declare namespace cp {
  export class CircleShape extends Shape {
    center: Vect;
    radius: number;
    tc: Vect;
    bbL: number;
    bbB: number;
    bbR: number;
    bbT: number;
    constructor(body: Body, radius: number, offset: Vect);
    cacheData(p: Vect, rot: Vect): void;
    nearestPointQuery(p: Vect): NearestPointQueryInfo;
    segmentQuery(a: Vect, b: Vect): SegmentQueryInfo;
  }
}