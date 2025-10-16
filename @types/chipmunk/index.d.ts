/// <reference path="../cocos2d/index.d.ts" />
/// <reference path="space.d.ts" />
/// <reference path="util.d.ts" />

declare namespace cc {
  export class PhysicsSprite extends Sprite {
    public constructor(fileName: string | cc.Texture2D | cc.SpriteFrame, rect?: Rect, rotated?: boolean)
    static create(fileName: string | cc.Texture2D | cc.SpriteFrame, rect?: Rect, rotated?: boolean): PhysicsSprite
    setBody(body: cp.Body): void
    getBody(): cp.Body
  }
  export class PhysicsDebugNode extends Node {
    public constructor(space: cp.Space)
    visible: boolean
  }
}
