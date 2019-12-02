import * as PIXI from 'pixi.js'

const BtnSize = 50;

export default class ControlBox extends PIXI.Container{
    constructor(sprite) {
        super();
        this.init(sprite);
        this.btnSize = 50;
    }

    init(sprite) {
        const {x, y, width, height, rotation } = sprite;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.rotation = rotation;

        this.scaleBtnActive = false;
        this.rotationBtnActive = false;
        this.pivotCenterActive = false;
        this.visible = true;

        this.outline = this.drawObject({
            type: 'graphics',
            properties: {
                interactive: true,
                cursor: 'move',
                x: 0,
                y: 0,
                width,
                height,
                anchor: 0.5
            },
            events: {
                pointerdown: this.outlinePointerDown.bind(this),
                pointermove: this.outlinePointerMove.bind(this),
                pointerup: this.outlinePointerUpointerUp.bind(this),
                pointerupoutside: this.outlinePointerUp.bind(this)
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
                width: BtnSize,
                height: BtnSize,
                scale: 0.5,
                anchor: 0.5,
            },
            events: {
                pointerdown: this.rotationBtnPointerDown.bind(this),
                pointermove: this.rotationBtnPointerMove.bind(this),
                pointerup: this.rotationBtnPointerUp.bind(this),
                pointerupoutside: this.rotationBtnPointerUp.bind(this)
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
                width: BtnSize,
                height: BtnSize,
                anchor: 0.5,
                scale: 0.5
            },
            events: {
                pointerdown: this.scaleBtnPointerDown.bind(this),
                pointermove: this.scaleBtnPointerMove.bind(this),
                pointerup: this.scaleBtnPointerUp.bind(this),
                pointerupoutside: this.scaleBtnPointerUp.bind(this)
            }
        })

        this.addChild(this.outline);
        this.addChild(this.rotationBtn);
        this.addChild(this.scaleBtn);
// debugger
        this.updateOutline();
    }

    drawObject(opts) {
        const { type, icon, properties, events } = opts;
        const { x, y, scale = 1, anchor = 0, ...prop } = properties;
        console.log(opts, x, y)
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
        // debugger
        obj.position.x = x;
        obj.position.y = y;
        obj.scale.x = scale;
        obj.scale.y = scale;
        
        return  obj;
    }

    updateOutline() {
        this.outline.clear();
        this.outline.beginFill(0x000000, 0);
        this.outline.lineStyle(2, 0x27AD8A);
        this.outline.drawRect(-this.width / 2, -this.height / 2, this.width, this.height);
        this.outline.endFill();
    }

    drawEditorBox () {
        this.editorBox = new PIXI.Graphics();
        this.editorBox.interactive = true;
        this.editorBox.cursor = "move";
        this.editorBox.on("pointerdown", this.editorBoxPointerDown.bind(this));
        this.editorBox.on("pointermove", this.editorBoxPointerMove.bind(this));
        this.editorBox.on("pointerup", this.editorBoxPointerUp.bind(this));
        this.editorBox.on("pointerupoutside", this.editorBoxPointerUp.bind(this));
        this.editorBox.on("rightclick", this.moreBtnPointerTap.bind(this));

        this.node.addChild(this.editorBox);
    }

    rotationBtnPointerDown(e) {
        e.stopPropagation();
        this.rotationBtnActive = true;
        let _sprite = this.sprite;
        let local_x = e.data.getLocalPosition(_sprite.sprite).x;
        let local_y = e.data.getLocalPosition(_sprite.sprite).y;
        let rotation = positionToRotation(local_x - _sprite.x, local_y - _sprite.y) + Math.PI / 2;
        this.oldRotation = rotation - _sprite.rotation;
        this.moved = false;
    }
    rotationBtnPointerUp() {
        this.rotationBtnActive = false;
        if (this.moved) {
            this.moved = false;
            let _sprite = this.sprite;
            let _rotation = (_sprite.rotation / Math.PI * 180) % 360;
            if (_rotation < 0) _rotation += 360;
            let _pivotX = _sprite.pivot.x,
                _pivotY = _sprite.pivot.y;
            this.pivotCenterActive = true;
            this.pivotCenterPointerUp(true, 0, 0);
            this.pivotCenterActive = true;
            this.pivotCenterPointerUp(true, _pivotX, _pivotY);
        }
    }
    rotationBtnPointerMove(e) {
        if (this.vue.spacePoint.key) return false;
        if (this.rotationBtnActive) {
            this.moved = true;
            let _sprite = this.sprite;
            let rotation = positionToRotation(e.data.getLocalPosition(_sprite.sprite).x - _sprite.x, e.data.getLocalPosition(_sprite.sprite).y - _sprite.y) + Math.PI / 2;
            _sprite.rotation = rotation - this.oldRotation;
            this.rotation = _sprite.rotation;
        }
    }

    scaleBtnPointerDown() {

    }

    scaleBtnPointerMove() {}
    scaleBtnPointerUp(){}
    pointerupoutside(){}

    outlinePointerDown() {

    }

    outlinePointerMove() {

    }

    outlinePointerUpointerUp() {

    }

    outlinePointerUp() {

    }
}