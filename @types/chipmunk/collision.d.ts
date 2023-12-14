/// <reference path="shapes.d.ts" />
/// <reference path="vect.d.ts" />

namespace cp {
  export declare class Contact {
    p: Vect;
    n: Vect;
    dist: number;
    r1: Vect;
    r2: Vect;
    nMass: number;
    tMass: number;
    bounce: number;
    bias: number;
    jnAcc: number;
    jtAcc: number;
    jBias: number;
    hash: any;
    constructor(p: Vect, n: Vect, dist: number, hash: any);
  }
  export declare function collideShapes(a: Shape, b: Shape): any;
}