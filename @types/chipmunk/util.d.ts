/// <reference path="bb.d.ts" />
/// <reference path="vect.d.ts" />

declare namespace cp {
  export function assert(value: any, message: string): void;
  export function assertSoft(value: any, message: string): void;
  export function hashPair(a: number, b: number): string;
  export function deleteObjFromList<T>(arr: T[], obj: T): void;
  export function closestPointOnSegment(p: Vect, a: Vect, b: Vect): Vect;
  export function closestPointOnSegment2(px: number, py: number, ax: number, ay: number, bx: number, by: number): Vect;
  export function momentForCircle(m: number, r1: number, r2: number, offset: Vect): number;
  export function areaForCircle(r1: number, r2: number): number;
  export function momentForSegment(m: number, a: Vect, b: Vect): number;
  export function areaForSegment(a: Vect, b: Vect, r: number): number;
  export function momentForPoly(m: number, verts: number[], offset: Vect): number;
  export function areaForPoly(verts: number[]): number;
  export function centroidForPoly(verts: number[]): Vect;
  export function recenterPoly(verts: number[]): void;
  export function momentForBox(m: number, width: number, height: number): number;
  export function momentForBox2(m: number, bb: BB): number;
  export function clamp(f: number, minv: number, maxv: number): number;
  export function clamp01(f: number): number;
  export function lerp(f1: number, f2: number, t: number): number;
  export function lerpconst(f1: number, f2: number, d: number): number;
}