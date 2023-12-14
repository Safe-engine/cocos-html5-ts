namespace cp {
  export declare class Vect {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
  }
  export declare function v(x: number, y: number): Vect;
  export declare const vzero: Vect;
  export declare function vdot(v1: Vect, v2: Vect): number;
  export declare function vdot2(x1: number, y1: number, x2: number, y2: number): number;
  export declare function vlength(vect: Vect): number;
  export declare function vlength2(x: number, y: number): number;
  export declare function veql(v1: Vect, v2: Vect): boolean;
  export declare function vadd(...vectors: Vect[]): Vect;
  export declare function vsub(v1: Vect, v2: Vect): Vect;
  export declare function vneg(vect: Vect): Vect;
  export declare function vmult(vect: Vect, s: number): Vect;
  export declare function vcross(v1: Vect, v2: Vect): number;
  export declare function vcross2(x1: number, y1: number, x2: number, y2: number): number;
  export declare function vperp(vect: Vect): Vect;
  export declare function vpvrperp(vect: Vect): Vect;
  export declare function vproject(v1: Vect, v2: Vect): Vect;
  export declare function vrotate(v1: Vect, v2: Vect): Vect;
  export declare function vunrotate(v1: Vect, v2: Vect): Vect;
  export declare function vlengthsq(vect: Vect): number;
  export declare function vlengthsq2(x: number, y: number): number;
  export declare function vlerp(v1: Vect, v2: Vect, t: number): Vect;
  export declare function vnormalize(vect: Vect): Vect;
  export declare function vnormalize_safe(vect: Vect): Vect;
  export declare function vclamp(vect: Vect, len: number): Vect;
  export declare function vlerpconst(v1: Vect, v2: Vect, d: number): Vect;
  export declare function vdist(v1: Vect, v2: Vect): number;
  export declare function vdistsq(v1: Vect, v2: Vect): number;
  export declare function vnear(v1: Vect, v2: Vect, dist: number): boolean;
  export declare function vslerp(v1: Vect, v2: Vect, t: number): Vect;
  export declare function vslerpconst(v1: Vect, v2: Vect, a: number): Vect;
  export declare function vforangle(a: number): Vect;
  export declare function vtoangle(vect: Vect): number;
  export declare function vstr(vect: Vect): string;
}