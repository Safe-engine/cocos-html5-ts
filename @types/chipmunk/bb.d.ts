/// <reference path="vect.d.ts" />

namespace cp {
  export declare class BB {
    readonly l: number;
    readonly b: number;
    readonly r: number;
    readonly t: number;
    constructor(l: number, b: number, r: number, t: number);
    containsVect(vect: Vect): boolean;
    containsBox(other: BB): boolean;
    expand(vect: Vect): BB;
  }
  export declare function bb(l: number, b: number, r: number, t: number): BB;
  export declare function bbNewForCircle(c: Vect, r: number): BB;
  export declare function bbIntersects(boxA: BB, boxB: BB): boolean;
  export declare function bbIntersects2(box: BB, l: number, b: number, r: number, t: number): boolean;
  export declare function bbMerge(boxA: BB, boxB: BB): BB;
  export declare function bbArea(box: BB): number;
  export declare function bbMergedArea(boxA: BB, boxB: BB): number;
  export declare function bbMergedArea2(box: BB, l: number, b: number, r: number, t: number): number;
  export declare function bbClampVect(box: BB, vect: Vect): Vect;
  export declare function bbWrapVect(box: BB, vect: Vect): Vect;
}