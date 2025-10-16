/// <reference path="../space.d.ts" />
/// <reference path="constraint.d.ts" />

declare namespace cp {
  export function relativeVelocity(a: Body, b: Body, r1: Vect, r2: Vect): Vect;
  export function normalRelativeVelocity(a: Body, b: Body, r1: Vect, r2: Vect, n: Vect): number;
  export function applyImpulse(body: Body, jx: number, jy: number, r: Vect): void;
  export function applyImpulses(a: Body, b: Body, r1: Vect, r2: Vect, jx: number, jy: number): void;
  export function applyBiasImpulse(body: Body, jx: number, jy: number, r: Vect): void;
  export function kScalarBody(body: Body, r: Vect, n: Vect): number;
  export function kScalar(a: Body, b: Body, r1: Vect, r2: Vect, n: Vect): number;
  export function kTensor(a: Body, b: Body, r1: Vect, r2: Vect): [Vect, Vect];
  export function multK(vr: Vect, k1: Vect, k2: Vect): Vect;
  export function biasCoef(errorBias: number, dt: number): number;
}