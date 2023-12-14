/// <reference path="space.d.ts" />
import { Body } from "../body";
import { Vect } from "../vect";
import { Constraint } from "./constraint";
namespace cp {
  export declare class DampedSpring extends Constraint {
    anchr1: Vect;
    anchr2: Vect;
    restLength: number;
    stiffness: number;
    damping: number;
    springForceFunc: (spring: DampedSpring, dist: number) => number;
    targetNormalRelativeVelocity: number;
    dragCoef: number;
    r1: Vect;
    r2: Vect;
    nMass: number;
    n: Vect;
    constructor(a: Body, b: Body, anchr1: Vect, anchr2: Vect, restLength: number, stiffness: number, damping: number);
    preStep(dt: number): void;
    applyCachedImpulse(dtCoef: number): void;
    applyImpulse(): void;
    getImpulse(): number;
  }
}