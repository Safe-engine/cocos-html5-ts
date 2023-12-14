/// <reference path="space.d.ts" />
import { Body } from "../body";
import { Constraint } from "./constraint";
namespace cp {
  export declare class SimpleMotor extends Constraint {
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