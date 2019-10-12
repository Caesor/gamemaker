import * as PIXI from 'pixi.js'

class app extends PIXI.Application {
    constructor({ width, height, options}) {
        super(width, height, options);
        // stage 可交互
        this.stage.interactive = true;
        // stage 可点击
        this.gameWidth = width;
        this.gameHeight = height;
        this.stage.hitArea = new PIXI.Rectangle(-width / 2, -height / 2, width, height);
        // 坐标系以屏幕中心为原点
        this.stage.pivot.set(-width / 2, -height / 2);

        this.init();
    }

    init() {

    }

    reset() {
        this.scenes = new PIXI.Container;
        this.stage.addChild(this.scenes);

        this.variableCollection = {};
        this.textCollection = {};
        this.sprites = {};
        this.scene = [];
        this.styleList = {};

        this.clonePool = {};
        this.mouse_x = NaN;
        this.mouse_y = NaN;

        this.mouse_down = false;
        this.isMouseMoving = false;
    }
}