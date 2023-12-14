/// <reference path="../vect.d.ts" />
/// <reference path="../bb.d.ts" />
/// <reference path="../body.d.ts" />
/// <reference path="../space.d.ts" />

namespace cp {
  export declare abstract class Shape {
    type: string;
    body: Body;
    bbL: number;
    bbB: number;
    bbR: number;
    bbT: number;
    hashid: number;
    sensor: boolean;
    restitutionCoef: number;
    frictionCoef: number;
    surfaceVelocity: Vect;
    collisionType: number;
    collisionCode: number;
    collisionTable: any;
    group: number;
    layers: number;
    space: Space;
    constructor(body: Body);
    setElasticity(e: number): void;
    setFriction(u: number): void;
    setLayers(layers: number): void;
    setSensor(sensor: boolean): void;
    setCollisionType(collisionType: number): void;
    getBody(): Body;
    active(): boolean;
    setBody(body: Body): void;
    cacheBB(): void;
    update(pos: Vect, rot: Vect): void;
    pointQuery(p: Vect): NearestPointQueryInfo;
    getBB(): BB;
    abstract nearestPointQuery(poing: Vect): NearestPointQueryInfo;
    abstract segmentQuery(a: Vect, b: Vect): SegmentQueryInfo;
    protected abstract cacheData(pos: Vect, rot: Vect): void;
  }
  export declare class PointQueryExtendedInfo {
    shape: Shape;
    d: number;
    n: Vect;
    constructor(shape: Shape);
  }
  export declare class NearestPointQueryInfo {
    shape: Shape;
    p: Vect;
    d: number;
    constructor(shape: Shape, p: Vect, d: number);
  }
  export declare class SegmentQueryInfo {
    shape: Shape;
    t: number;
    n: Vect;
    constructor(shape: Shape, t: number, n: Vect);
    hitPoint(start: Vect, end: Vect): Vect;
    hitDist(start: Vect, end: Vect): number;
  }
}