/// <reference path="../space.d.ts" />
/// <reference path="constraint.d.ts" />

declare namespace cp {
  export class SimpleMotor extends Constraint {
    rate: number;
    jAcc: number;
    iSum: number;
    jMax: number;
    constructor(a: Body, b: Body, rate: number);
    preStep(dt: number): void;
    applyCachedImpulse(dtCoef: number): void;
    applyImpulse(): void;
    getImpulse(): number;
  }
}