/// <reference path="vect.d.ts" />

declare namespace cp {
  export class BB {
    readonly l: number;
    readonly b: number;
    readonly r: number;
    readonly t: number;
    constructor(l: number, b: number, r: number, t: number);
    containsVect(vect: Vect): boolean;
    containsBox(other: BB): boolean;
    expand(vect: Vect): BB;
  }
  export function bb(l: number, b: number, r: number, t: number): BB;
  export function bbNewForCircle(c: Vect, r: number): BB;
  export function bbIntersects(boxA: BB, boxB: BB): boolean;
  export function bbIntersects2(box: BB, l: number, b: number, r: number, t: number): boolean;
  export function bbMerge(boxA: BB, boxB: BB): BB;
  export function bbArea(box: BB): number;
  export function bbMergedArea(boxA: BB, boxB: BB): number;
  export function bbMergedArea2(box: BB, l: number, b: number, r: number, t: number): number;
  export function bbClampVect(box: BB, vect: Vect): Vect;
  export function bbWrapVect(box: BB, vect: Vect): Vect;
}