/// <reference path="bb.d.ts" />
/// <reference path="vect.d.ts" />

namespace cp {
  export declare function assert(value: any, message: string): void;
  export declare function assertSoft(value: any, message: string): void;
  export declare function hashPair(a: number, b: number): string;
  export declare function deleteObjFromList<T>(arr: T[], obj: T): void;
  export declare function closestPointOnSegment(p: Vect, a: Vect, b: Vect): Vect;
  export declare function closestPointOnSegment2(px: number, py: number, ax: number, ay: number, bx: number, by: number): Vect;
  export declare function momentForCircle(m: number, r1: number, r2: number, offset: Vect): number;
  export declare function areaForCircle(r1: number, r2: number): number;
  export declare function momentForSegment(m: number, a: Vect, b: Vect): number;
  export declare function areaForSegment(a: Vect, b: Vect, r: number): number;
  export declare function momentForPoly(m: number, verts: number[], offset: Vect): number;
  export declare function areaForPoly(verts: number[]): number;
  export declare function centroidForPoly(verts: number[]): Vect;
  export declare function recenterPoly(verts: number[]): void;
  export declare function momentForBox(m: number, width: number, height: number): number;
  export declare function momentForBox2(m: number, bb: BB): number;
  export declare function clamp(f: number, minv: number, maxv: number): number;
  export declare function clamp01(f: number): number;
  export declare function lerp(f1: number, f2: number, t: number): number;
  export declare function lerpconst(f1: number, f2: number, d: number): number;
}