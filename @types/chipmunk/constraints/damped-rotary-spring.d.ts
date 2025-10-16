/// <reference path="../space.d.ts" />
/// <reference path="constraint.d.ts" />

declare namespace cp {
  export class DampedRotarySpring extends cp.Constraint {
    restAngle: number;
    stiffness: number;
    damping: number;
    springTorqueFunc: (spring: DampedRotarySpring, relativeAngle: number) => number;
    targetNormalRelativeRate: number;
    dragCoef: number;
    iSum: number;
    constructor(a: Body, b: Body, restAngle: number, stiffness: number, damping: number);
    preStep(dt: number): void;
    applyImpulse(): void;
  }
}