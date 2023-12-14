/// <reference path="space.d.ts" />
import { Body } from "../body";
import { Constraint } from "./constraint";
namespace cp {
  export declare class GearJoint extends Constraint {
    phase: number;
    ratio: number;
    ratioInv: number;
    jAcc: number;
    iSum: number;
    bias: number;
    jMax: number;
    constructor(a: Body, b: Body, phase: number, ratio: number);
    preStep(dt: number): void;
    applyCachedImpulse(dtCoef: number): void;
    applyImpulse(): void;
    getImpulse(): number;
    setRatio(value: number): void;
  }
}