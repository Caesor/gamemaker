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

export default class ControlBox extends PIXI.Container{
    constructor(sprite, opt) {
        super();
        this.sprite = sprite;
        this.opt = opt;
        this.init(sprite);
    }

    init(sprite) {
        const {x, y, width, height, rotation } = sprite;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;
        this.visible = true;

        this.scaleBtnActive = false;
        this.rotationBtnActive = false;
        // this.pivotCenterActive = false;
        
        this.outline = this.drawObject({
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
        });

        this.rotationBtn = this.drawObject({
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
        });

        this.scaleBtn = this.drawObject({
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
        })

        this.addChild(this.outline);
        this.addChild(this.rotationBtn);
        this.addChild(this.scaleBtn);

        // redraw the box line, do not scale it
        this.updateOutline();
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

    updateOutline() {
        const { width, height } = this.sprite;
        this.outline.clear();
        this.outline.beginFill(0x000000, 0.1);
        this.outline.lineStyle(2, 0x27AD8A);
        this.outline.drawRect(-width/2, -height/2, width, height);
        this.outline.endFill();
    }

    updateBtns() {
        this.scaleBtn.x = this.outline.width / 2;
        this.scaleBtn.y = this.outline.height / 2;

        this.rotationBtn.x = -this.outline.width / 2;
        this.rotationBtn.y = -this.outline.height / 2;

        if(this.sprite.width <= 80) {
            this.scaleBtn.width = BtnSmallSize;
            this.scaleBtn.height = BtnSmallSize;
            this.rotationBtn.width = BtnSmallSize;
            this.rotationBtn.height = BtnSmallSize;
        }else {
            this.scaleBtn.width = BtnBigSize;
            this.scaleBtn.height = BtnBigSize;
            this.rotationBtn.width = BtnBigSize;
            this.rotationBtn.height = BtnBigSize;
        }
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
            this.rotation = positionToRotation(x - this.x, y - this.y) + Math.PI / 2 - this.preRotation;
            this.sprite.rotation = this.rotation;
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
            // change sprite
            const width = Math.max(this.sprite.width + (x - this.pre.x) * 2, MINSCALE)
            const height = Math.max(this.sprite.height + (y - this.pre.y) * 2, MINSCALE);

            if(true) {
                this.sprite.height = width * this.sprite.height / this.sprite.width;
                this.sprite.width = width;
            }else {
                this.sprite.height += (y - this.pre.y) * 2;
            }
    
            this.pre = {x, y};
            this.updateBtns();
            this.updateOutline();
        }
    }

    scaleBtnDragEnd(){
        this.scaleBtnActive = false;
        this.pre = null;
    }

    outlineDragStart(e) {
        this.dragging = true;
        const { x, y } = e.data.getLocalPosition(this.parent);
        this.diff = {x: this.x - x , y: this.y - y};
    }

    outlineDragMove(e) {
        if(this.dragging) {
            const { x, y } = e.data.getLocalPosition(this.parent);
            this.sprite.x = this.x = x + this.diff.x;
            this.sprite.y = this.y = y + this.diff.y;
        }
    }

    outlineDragEnd() {
        this.dragging = false;
    }
}