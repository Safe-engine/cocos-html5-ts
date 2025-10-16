/// <reference path="../body.d.ts" />
/// <reference path="./poly-shape.d.ts" />

declare namespace cp {
  export class BoxShape extends PolyShape {
    image: cc.Sprite;
    constructor(body: Body, width: number, height: number);
  }
  export class BoxShape2 extends PolyShape {
    constructor(body: Body, bb: BB);
  }
}