import * as PIXI from 'pixi.js'

const BtnBigSize = 30;
const BtnSmallSize = 20;
const MINSCALE = 15;

//相对位置求角度
const positionToRotation = function (x, y) {
    if (0 === x && 0 === y)
        return 0;
    let r = Math.pow(x * x + y * y, .5);
    let ry = Math.asin(y / r);
    return x < 0 && (ry = ry > 0 ? Math.PI - ry : -Math.PI - ry), ry < 0 ? ry + 2 * Math.PI : ry
};

export default class Outline extends PIXI.Container{
    constructor(sprite, options = {}) {
        super();
        this.sprite = sprite;
        this.options = options;
        this.init(sprite);
    }

    init(sprite) {
        const {x, y, width, height, rotation } = sprite;
        this.x = x;
        this.y = y;
        this.bounds = { x, y, width, height };
        
        this.rotation = rotation;
        this.visible = true;

        this.scaleBtnActive = false;
        this.rotationBtnActive = false;

        const { scaleBtn = true, rotationBtn = false, outline } = this.options;
        
        this.outline = this.drawObject(Object.assign({
            type: 'graphics',
            properties: {
                interactive: true,
                cursor: 'move',
                x: 0,
                y: 0,
                width,
                height
            },
            events: {
                pointerdown: this.outlineDragStart.bind(this),
                pointermove: this.outlineDragMove.bind(this),
                pointerup: this.outlineDragEnd.bind(this),
                pointerupoutside: this.outlineDragEnd.bind(this)
            }
        }, outline));

        rotationBtn && (this.rotationBtn = this.drawObject({
            type: 'sprite',
            icon: 'https://res.wx.qq.com/wechatgame/product/cdn/luban/icon-rotate_2aaffb75.png',
            properties: {
                interactive: true,
                cursor: 'pointer',
                x: -width / 2,
                y: -height / 2,
                width: BtnBigSize,
                height: BtnBigSize,
                scale: 0.5,
                anchor: 0.5,
            },
            events: {
                pointerdown: this.rotationBtnDragStart.bind(this),
                pointermove: this.rotationBtnDragMove.bind(this),
                pointerup: this.rotationBtnDragEnd.bind(this),
                pointerupoutside: this.rotationBtnDragEnd.bind(this)
            }
        }));

        scaleBtn && (this.scaleBtn = this.drawObject({
            type: 'sprite',
            icon: 'https://res.wx.qq.com/wechatgame/product/cdn/luban/icon-scale_be8d480f.png',
            properties: {
                interactive: true,
                cursor: 'nwse-resize',
                x: width / 2,
                y: height / 2,
                width: BtnBigSize,
                height: BtnBigSize,
                anchor: 0.5,
                scale: 0.5
            },
            events: {
                pointerdown: this.scaleBtnDragStart.bind(this),
                pointermove: this.scaleBtnDragMove.bind(this),
                pointerup: this.scaleBtnDragEnd.bind(this),
                pointerupoutside: this.scaleBtnDragEnd.bind(this)
            }
        }))

        this.addChild(this.outline);
        this.rotationBtn && this.addChild(this.rotationBtn);
        this.scaleBtn && this.addChild(this.scaleBtn);

        // redraw the box line, do not scale it
        this.updateOutline(width, height);
        // location & size
        this.updateBtns();
    }

    drawObject(opts) {
        const { type, icon, properties, events } = opts;
        const { x, y, scale = 1, anchor = 0, ...prop } = properties;
        let obj;
        switch (type) {
            case 'sprite':
                obj = new PIXI.Sprite.from(icon);
                obj.anchor.set(anchor)
                break;
            case 'graphics':
                obj = new PIXI.Graphics();
                break;
            default:
                break;
        }
        
        Object.assign(obj, prop);

        obj.position.x = x;
        obj.position.y = y;
        obj.scale.set(scale, scale);

        for(let e in events) {
            obj.on(e, events[e])
        }

        return  obj;
    }

    updateOutline(width, height) {
        this.outline.clear();
        this.outline.beginFill(0x000000, 0.01);
        this.outline.lineStyle(1, 0x27AD8A);
        this.outline.drawRect(-width/2, -height/2, width, height);
        this.outline.endFill();
        Object.assign(this.bounds, { type: 'rect', width, height });
    }

    updateBtns() {
        if(this.scaleBtn) {
            this.scaleBtn.x = this.outline.width / 2;
            this.scaleBtn.y = this.outline.height / 2;
        }
        if(this.rotationBtn){
            this.rotationBtn.x = -this.outline.width / 2;
            this.rotationBtn.y = -this.outline.height / 2;
        }
        if(this.bounds.width <= 80) {
            if(this.scaleBtn) {
                this.scaleBtn.width = BtnSmallSize;
                this.scaleBtn.height = BtnSmallSize;
            }
            if(this.rotationBtn) {
                this.rotationBtn.width = BtnSmallSize;
                this.rotationBtn.height = BtnSmallSize;
            }
            
        }else {
            if(this.scaleBtn) {
                this.scaleBtn.width = BtnBigSize;
                this.scaleBtn.height = BtnBigSize;
            }
            if(this.rotationBtn) {
                this.rotationBtn.width = BtnBigSize;
                this.rotationBtn.height = BtnBigSize;
            }
        }
    }

    scaleBtnDragStart(e) {
        this.scaleBtnActive = true;
        const { x, y } = e.data.getLocalPosition(this.parent);
        this.pre = {x, y};
    }

    scaleBtnDragMove(e) {
        if(this.scaleBtnActive) {
            const { x, y } = e.data.getLocalPosition(this.parent);
            const width = Math.max(this.bounds.width + (x - this.pre.x) * 2, MINSCALE)
            const height = Math.max(this.bounds.height + (y - this.pre.y) * 2, MINSCALE);
            this.pre = {x, y};
            this.updateOutline(width, height);
            // console.log(width, height)
            this.updateBtns();
        }
    }

    scaleBtnDragEnd(){
        this.scaleBtnActive = false;
        this.pre = null;
        console.log(this.bounds)
    }

    outlineDragStart(e) {
        this.dragging = true;
        const { x, y } = e.data.getLocalPosition(this.parent);
        this.diff = {x: this.x - x , y: this.y - y};
    }

    outlineDragMove(e) {
        if(this.dragging) {
            const { x, y } = e.data.getLocalPosition(this.parent);
            this.x = Math.floor(x + this.diff.x);
            this.y = Math.floor(y + this.diff.y);
        }
    }

    outlineDragEnd() {
        Object.assign(this.bounds, {x: this.x, y: this.y})
        this.dragging = false;
        console.log(this.bounds)
    }

    rotationBtnDragStart(e) {
        this.rotationBtnActive = true;
        const { x, y } = e.data.getLocalPosition(this.parent);
        this.preRotation = positionToRotation(x - this.x, y - this.y) + Math.PI / 2 - this.rotation;
    }
    rotationBtnDragEnd() {
        this.rotationBtnActive = false;
    }
    rotationBtnDragMove(e) {
        if(this.rotationBtnActive) {
            const { x, y } = e.data.getLocalPosition(this.parent);
            this.rotation = Number(positionToRotation(x - this.x, y - this.y) + Math.PI / 2 - this.preRotation).toFixed(2);
            // this.sprite.rotation = this.rotation;
        }
    }
}