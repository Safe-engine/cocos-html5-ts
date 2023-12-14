/// <reference path="../body.d.ts" />
/// <reference path="../poly-shape.d.ts" />

namespace cp {
  export declare class BoxShape extends PolyShape {
    image: cc.Sprite;
    constructor(body: Body, width: number, height: number);
  }
  export declare class BoxShape2 extends PolyShape {
    constructor(body: Body, bb: BB);
  }
}