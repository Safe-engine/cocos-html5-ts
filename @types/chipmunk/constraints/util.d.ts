/// <reference path="space.d.ts" />
import { Body } from "../body";
import { Vect } from "../vect";
namespace cp {
  export declare function relativeVelocity(a: Body, b: Body, r1: Vect, r2: Vect): Vect;
  export declare function normalRelativeVelocity(a: Body, b: Body, r1: Vect, r2: Vect, n: Vect): number;
  export declare function applyImpulse(body: Body, jx: number, jy: number, r: Vect): void;
  export declare function applyImpulses(a: Body, b: Body, r1: Vect, r2: Vect, jx: number, jy: number): void;
  export declare function applyBiasImpulse(body: Body, jx: number, jy: number, r: Vect): void;
  export declare function kScalarBody(body: Body, r: Vect, n: Vect): number;
  export declare function kScalar(a: Body, b: Body, r1: Vect, r2: Vect, n: Vect): number;
  export declare function kTensor(a: Body, b: Body, r1: Vect, r2: Vect): [Vect, Vect];
  export declare function multK(vr: Vect, k1: Vect, k2: Vect): Vect;
  export declare function biasCoef(errorBias: number, dt: number): number;
}