declare namespace ccui {
  type Color4B = cc.Color;

  export class Margin {
    left: number;
    top: number;
    right: number;
    bottom: number;
    setMargin: (l: number, t: number, r: number, b: number) => void;
  }

  export class LayoutParameter {
    public static NONE = 0;
    public static LINEAR = 1;
    public static RELATIVE = 2;
    setMargin: (margin: Margin | number, top?: number, right?: number,
      bottom?: number) => void;
  }

  export class RelativeLayoutParameter extends LayoutParameter {
    setAlign: (align: number) => void;
  }
  export class LinearLayoutParameter extends LayoutParameter {
    public static NONE = 0;
    /**
     * The left of ccui.LinearLayoutParameter's linear gravity.
     * @constant
     * @type {number}
     */
    public static LEFT = 1;
    /**
     * The top of ccui.LinearLayoutParameter's linear gravity.
     * @constant
     * @type {number}
     */
    public static TOP = 2;
    /**
     * The right of ccui.LinearLayoutParameter's linear gravity.
     * @constant
     * @type {number}
     */
    public static RIGHT = 3;
    /**
     * The bottom of ccui.LinearLayoutParameter's linear gravity.
     * @constant
     * @type {number}
     */
    public static BOTTOM = 4;
    /**
     * The center vertical of ccui.LinearLayoutParameter's linear gravity.
     * @constant
     * @type {number}
     */
    public static CENTER_VERTICAL = 5;
    /**
     * The center horizontal of ccui.LinearLayoutParameter's linear gravity.
     * @constant
     * @type {number}
     */
    public static CENTER_HORIZONTAL = 6;
    setGravity: (gravity: number) => void;
  }

  export type LayoutParameterType = LayoutParameter.NONE | LayoutParameter.LINEAR | LayoutParameter.RELATIVE;
  export type WidgetClickCallback = (sender: ccui.Widget) => void;
  export type WidgetTouchSelector = (sender: ccui.Widget, type: number) => void;
  export class Widget extends cc.Node {
    public static TOUCH_BEGAN = 0;
    public static TOUCH_MOVED = 1;
    public static TOUCH_ENDED = 2;
    public static TOUCH_CANCELED = 3;
    public static LOCAL_TEXTURE = 0;
    public static PLIST_TEXTURE = 1;
    node: Node;
    touchEnabled: boolean;
    getTouchEndPosition(): cc.Point;
    getTouchMovePosition(): cc.Point;
    getTouchBeganPosition(): cc.Point;
    ignoreContentAdaptWithSize(ignore: bool): void;
    addTouchEventListener: (selector: WidgetTouchSelector) => void;
    addClickEventListener: (callback: WidgetClickCallback) => void;
    setLayoutParameter(parameter: LayoutParameter): void;
    getLayoutParameter(type: LayoutParameterType): LayoutParameter;
    setUnifySizeEnabled(enabled: boolean): void;
    setLayoutComponentEnabled(enabled: boolean): void;
    setTouchEnabled(enabled: boolean): void;
    setBright(bright: boolean): void;
    setHighlighted(highlight: boolean): void;
    setEnabled(enabled: boolean): void;
  }

  export class Layout extends Widget {
    public static BG_COLOR_NONE = 0;
    public static BG_COLOR_SOLID = 1;
    public static BG_COLOR_GRADIENT = 2;
    public static ABSOLUTE = 0;
    public static LINEAR_VERTICAL = 1;
    public static LINEAR_HORIZONTAL = 2;
    public static RELATIVE = 3;
    public static CLIPPING_STENCIL = 0;
    public static CLIPPING_SCISSOR = 1;
    public static BACKGROUND_IMAGE_ZORDER = -1;
    public static BACKGROUND_RENDERER_ZORDER = -2;
    forceDoLayout(): void;
    setLayoutType(type: Layout.ABSOLUTE | Layout.LINEAR_VERTICAL | Layout.LINEAR_HORIZONTAL | Layout.RELATIVE): void;
  }

  export class Button extends Widget {
    constructor(normalImage: string, selectedImage: string, disableImage: string, texType: TextureType);
    loadTextureNormal(normal: string, texType?: TextureType): void;
    setZoomScale(scale: number);
    titleText: string;
    titleFontSize: number;
  }

  export class Text extends Widget {
    constructor(textContent: string, fontName: string, fontSize: number);
    setString(val: string): void;
    setFontSize(size: number): void;
    setFontName(font: string): void;
    setTextVerticalAlignment(align: number): void;
    string: string;

    enableOutline(color: Color4B, width: number)
    enableShadow(color: Color4B, offset: Size, blur: number)
  }

  export class TextField extends Widget {
    getString(): string
    setPlaceHolder(pl: string): void
    setFontName(font: string): void
    setFontSize(sz: number): void
    setTextColor(color: Color4B): void
    setMaxLengthEnabled(yes: boolean): void
    setMaxLength(max: number): void
    setPasswordEnabled(yes: boolean): void
  }

  export class Scale9Sprite extends cc.Sprite {
    constructor(file?: string | cc.Texture2D | cc.SpriteFrame, rectOrCapInsets?: cc.Rect, capInsets?: cc.Rect)
  }
  export class RichElement extends cc.Node {
  }
  export class RichElementText extends RichElement {
    static create(tag: number, color: Color4B, opacity: number, text: string, fontName: string, fontSize: number): RichElementText
  }
  export class RichElementCustomNode extends RichElement {
    static create(tag: number, color: Color4B, opacity: number, label?: any): RichElementText
  }
  export class RichText extends Widget {
    constructor();
    pushBackElement(val: RichElement): void;
    formatText(): void;
    _formatTextDirty: boolean;
    _richElements: RichElement[];
  }

  export class ImageView extends Widget {
    constructor(imageFileName: string, texType?: TextureType);
    string: string;
    isScale9Enabled(): boolean;
    loadTexture(fileName: string, texType?: TextureType);
    setCapInsets(capInsets: cc.Rect);
    setContentSize(contentSize: cc.Size, height?: number);
    setScale9Enabled(able: boolean);
  }

  export class LayoutComponent {
    public static horizontalEdge = { NONE: 0, LEFT: 1, RIGHT: 2, CENTER: 3 };
    public static verticalEdge = { NONE: 0, BOTTOM: 1, TOP: 2, CENTER: 3 };

    public static NAME = "__ui_layout";
    public static bindLayoutComponent<T extends cc.Node>(node: T): LayoutComponent;
    setHorizontalEdge(horizontalEdgeType: number): void;
    setVerticalEdge(verticalEdgeType: number): void;
    setTopMargin(topMargin: number): void;
    setBottomMargin(bottomMargin: number): void;
    setLeftMargin(leftMargin: number): void;
    setRightMargin(rightMargin: number): void;
    setStretchWidthEnabled(enabled: boolean): void;
    setStretchHeightEnabled(enabled: boolean): void;
    setSize(size: cc.Size): void;
  }

  export class LoadingBar extends Widget {
    public static TYPE_LEFT = 0;
    public static TYPE_RIGHT = 1;
    // The progress direction of loadingbar
    direction = LoadingBar.TYPE_LEFT | LoadingBar.TYPE_RIGHT;
    // The current progress of loadingbar
    percent: number;

    /**
     * Changes the progress direction of LoadingBar.
     * @param dir ccui.LoadingBar.TYPE_LEFT | ccui.LoadingBar.TYPE_RIGHT
     */
    setDirection(dir = LoadingBar.TYPE_LEFT | LoadingBar.TYPE_RIGHT): void;

    // The current progress of loadingBar
    setPercent(percent: number): void;
    getPercent(): number;
    /**
     *
     * @param texture
     * @param texType ccui.Widget.LOCAL_TEXTURE | ccui.Widget.PLIST_TEXTURE
     */
    loadTexture(texture: string, texType?: TextureType);
  }

  interface WidgetHelper {
    doLayout<T extends cc.Node>(layout: Layout | T): void;
    seekWidgetByName(root: cc.Node, name: string): ccui.Widget;
  }

  declare namespace Widget {
    export type TextureType = typeof Widget.LOCAL_TEXTURE | typeof Widget.PLIST_TEXTURE;
    export type TouchEventType = typeof Widget.TOUCH_BEGAN | typeof Widget.TOUCH_MOVED
  }
  var helper: WidgetHelper;

}
