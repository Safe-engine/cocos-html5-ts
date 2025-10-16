/// <reference path="../space.d.ts" />
/// <reference path="constraint.d.ts" />

declare namespace cp {
  export class PivotJoint extends Constraint {
    anchr1: Vect;
    anchr2: Vect;
    r1: Vect;
    r2: Vect;
    k1: Vect;
    k2: Vect;
    jAcc: Vect;
    jMaxLen: number;
    bias: Vect;
    constructor(a: Body, b: Body, anchr1: Vect, anchr2: Vect);
    preStep(dt: number): void;
    applyCachedImpulse(dtCoef: number): void;
    applyImpulse(): void;
    getImpulse(): number;
  }
}