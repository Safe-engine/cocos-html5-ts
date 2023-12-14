/// <reference path="../body.d.ts" />
/// <reference path="../vect.d.ts" />
/// <reference path="./base.d.ts" />

namespace cp {
  export declare class SplittingPlane {
    n: Vect;
    d: number;
    constructor(n: Vect, d: number);
    compare(vect: Vect): number;
  }
  export declare class PolyShape extends Shape {
    verts: number[];
    tVerts: number[];
    planes: SplittingPlane[];
    tPlanes: SplittingPlane[];
    constructor(body: Body, verts: number[], offset: Vect);
    setVerts(verts: number[], offset: Vect): void;
    transformVerts(p: Vect, rot: Vect): void;
    transformAxes(p: Vect, rot: Vect): void;
    cacheData(p: Vect, rot: Vect): void;
    nearestPointQuery(p: Vect): NearestPointQueryInfo;
    segmentQuery(a: Vect, b: Vect): SegmentQueryInfo;
    valueOnAxis(n: Vect, d: number): number;
    containsVert(vx: number, vy: number): boolean;
    containsVertPartial(vx: number, vy: number, n: Vect): boolean;
    getNumVerts(): number;
    getVert(i: number): Vect;
  }
}