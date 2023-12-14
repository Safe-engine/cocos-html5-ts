/// <reference path="space.d.ts" />
import { Body } from "../body";
import { Vect } from "../vect";
import { Constraint } from "./constraint";
namespace cp {
  export declare class PinJoint extends Constraint {
    anchr1: Vect;
    anchr2: Vect;
    p1: Vect;
    p2: Vect;
    dist: number;
    r1: Vect;
    r2: Vect;
    n: Vect;
    nMass: number;
    jnAcc: number;
    jnMax: number;
    bias: number;
    constructor(a: Body, b: Body, anchr1: Vect, anchr2: Vect);
    preStep(dt: number): void;
    applyCachedImpulse(dtCoef: number): void;
    applyImpulse(): void;
    getImpulse(): number;
  }
}