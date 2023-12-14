/// <reference path="space.d.ts" />
import { Body } from "../body";
import { Vect } from "../vect";
import { Constraint } from "./constraint";
namespace cp {
  export declare class GrooveJoint extends Constraint {
    grooveA: Vect;
    grooveB: Vect;
    grooveN: Vect;
    grooveTN: Vect;
    anchr1: Vect;
    anchr2: Vect;
    clamp: number;
    r1: Vect;
    r2: Vect;
    k1: Vect;
    k2: Vect;
    jAcc: Vect;
    jMaxLen: number;
    bias: Vect;
    constructor(a: Body, b: Body, grooveA: Vect, grooveB: Vect, anchr2: Vect);
    preStep(dt: number): void;
    applyCachedImpulse(dtCoef: number): void;
    grooveConstrain(j: Vect): Vect;
    applyImpulse(): void;
    getImpulse(): number;
    setGrooveA(value: Vect): void;
    setGrooveB(value: Vect): void;
  }
}