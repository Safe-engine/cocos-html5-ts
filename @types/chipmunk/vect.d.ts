declare namespace cp {
  export class Vect {
    readonly x: number;
    readonly y: number;
    constructor(x: number, y: number);
  }
  export function v(x: number, y: number): Vect;
  export const vzero: Vect;
  export function vdot(v1: Vect, v2: Vect): number;
  export function vdot2(x1: number, y1: number, x2: number, y2: number): number;
  export function vlength(vect: Vect): number;
  export function vlength2(x: number, y: number): number;
  export function veql(v1: Vect, v2: Vect): boolean;
  export function vadd(...vectors: Vect[]): Vect;
  export function vsub(v1: Vect, v2: Vect): Vect;
  export function vneg(vect: Vect): Vect;
  export function vmult(vect: Vect, s: number): Vect;
  export function vcross(v1: Vect, v2: Vect): number;
  export function vcross2(x1: number, y1: number, x2: number, y2: number): number;
  export function vperp(vect: Vect): Vect;
  export function vpvrperp(vect: Vect): Vect;
  export function vproject(v1: Vect, v2: Vect): Vect;
  export function vrotate(v1: Vect, v2: Vect): Vect;
  export function vunrotate(v1: Vect, v2: Vect): Vect;
  export function vlengthsq(vect: Vect): number;
  export function vlengthsq2(x: number, y: number): number;
  export function vlerp(v1: Vect, v2: Vect, t: number): Vect;
  export function vnormalize(vect: Vect): Vect;
  export function vnormalize_safe(vect: Vect): Vect;
  export function vclamp(vect: Vect, len: number): Vect;
  export function vlerpconst(v1: Vect, v2: Vect, d: number): Vect;
  export function vdist(v1: Vect, v2: Vect): number;
  export function vdistsq(v1: Vect, v2: Vect): number;
  export function vnear(v1: Vect, v2: Vect, dist: number): boolean;
  export function vslerp(v1: Vect, v2: Vect, t: number): Vect;
  export function vslerpconst(v1: Vect, v2: Vect, a: number): Vect;
  export function vforangle(a: number): Vect;
  export function vtoangle(vect: Vect): number;
  export function vstr(vect: Vect): string;
}