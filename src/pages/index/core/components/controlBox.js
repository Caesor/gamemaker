import * as PIXI from 'pixi.js'

const BtnSize = 50;

export default class ControlBox extends PIXI.Container{
    constructor(sprite) {
        super();
        this.init(sprite);
        this.btnSize = 50;
    }

    init(sprite) {
        this.x = sprite.x;
        this.y = sprite.y;
        this.rotation = sprite.rotation;

        this.scaleBtnActive = false;
        this.rotationBtnActive = false;
        this.pivotCenterActive = false;
        this.visible = true;

        this.outline = this.drawObject({
            type: 'graphics',
            properties: {
                nteractive: true,
                cursor: 'move',
                width: BtnSize,
                height: BtnSize,
                anchor: 0.5,
                scale: 0.5
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
            icon: '../../assets/control/icon-rotate.png',
            properties: {
                cursor: 'pointer',
                width: BtnSize,
                height: BtnSize,
                anchor: 0.5,
                scale: 0.5
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
            icon: '../../assets/control/icon-scale.png',
            properties: {
                cursor: 'nwse-resize',
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

        this.updateOutline();
    }

    drawObject(opts) {
        const { type, icon, properties, events } = opts;
        let obj;
        switch (type) {
            case 'sprite':
                console.log(require(icon))
                obj = new PIXI.Sprite.fromImage(require(icon), true);
                break;
            case 'graphics':
                obj = new PIXI.Graphics();
                break;
            default:
                break;
        }
        Object.assign(obj, properties);

        for(let e in events) {
            obj.on(e, events[e])
        }
        return  obj;
    }

    updateOutline() {
        this.outline.clear();
        this.outline.beginFill(0x000000, 0);
        this.outline.lineStyle(2, 0x27AD8A);
        this.outline.drawRect(-w / 2, -h / 2 + fix_y, w, h);
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

    outlinePointerDown() {

    }

    outlinePointerMove() {

    }

    outlinePointerUpointerUp() {

    }

    outlinePointerUp() {

    }
}