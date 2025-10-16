/// <reference path="../body.d.ts" />
/// <reference path="../space.d.ts" />

declare namespace cp {
  export abstract class Constraint {
    a: Body;
    b: Body;
    space: Space;
    nextA: Constraint;
    nextB: Constraint;
    maxForce: number;
    errorBias: number;
    maxBias: number;
    constructor(a: Body, b: Body);
    activateBodies(): void;
    preStep(dt: number): void;
    applyCachedImpulse(dtCoef: number): void;
    applyImpulse(): void;
    getImpulse(): number;
    preSolve(space: Space): void;
    postSolve(space: Space): void;
    next(body: Body): Constraint;
  }
}