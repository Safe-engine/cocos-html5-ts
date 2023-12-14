/// <reference path="space.d.ts" />
import { Body } from "../body";
import { Constraint } from "./constraint";
namespace cp {
  export declare class RatchetJoint extends Constraint {
    angle: number;
    phase: number;
    ratchet: number;
    iSum: number;
    bias: number;
    jAcc: number;
    jMax: number;
    constructor(a: Body, b: Body, phase: number, ratchet: number);
    preStep(dt: number): void;
    applyCachedImpulse(dtCoef: number): void;
    applyImpulse(): void;
    getImpulse(): number;
  }
}