/// <reference path="space.d.ts" />
import { Body } from "../body";
import { Constraint } from "./constraint";
namespace cp {
  export declare class RotaryLimitJoint extends Constraint {
    min: number;
    max: number;
    jAcc: number;
    iSum: number;
    bias: number;
    jMax: number;
    constructor(a: Body, b: Body, min: number, max: number);
    preStep(dt: number): void;
    applyCachedImpulse(dtCoef: number): void;
    applyImpulse(): void;
    getImpulse(): number;
  }
}