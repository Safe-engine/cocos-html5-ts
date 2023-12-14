/// <reference path="body.d.ts" />

namespace cp {
  export declare function componentRoot(body: Body): Body;
  export declare function componentActivate(root: Body): void;
  export declare function componentAdd(root: Body, body: Body): void;
  export declare function floodFillComponent(root: Body, body: Body): void;
  export declare function componentActive(root: Body, threshold: number): boolean;
}