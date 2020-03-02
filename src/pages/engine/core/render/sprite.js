import * as PIXI from 'pixi.js';
import Utils from '../utils/';

export default class Sprite extends PIXI.Sprite {
    constructor(id, texture, opt={}) {

        texture ? super(texture) : super();
        
        this.id = id;
        this.name = opt.name || "";

        this.init(opt.properties);
    }

    init(prop = {}) {
        prop.scale = prop.scale ? prop.scale : {x: 1, y: 1};

        this.rotation_type = prop.rotation_type || 0;

        // this.role_camp = prop.role_camp || "no_camp"; // 阵营

        const rotationValue = prop.rotation / 180 * Math.PI || 0;
        this.rotation = rotationValue; // 旋转角度

        this.rotationValue = rotationValue;
        this.faceRotationValue = 0; // 面向角度
        this.towardsRotationValue = 0; // 运行方向角度

        this.dragMode = prop.dragMode || 'none'; // 拖动模式
        this.dragging = false;
        this.alpha = 1;

        if(prop.backgroundColor && prop.type !== 'text') {
            this.tint = '0x' + prop.backgroundColor.hex.slice(1, 7);
            this.alpha = prop.backgroundColor.alpha;
        }

        if (prop && prop.currentStyleId) {
            this.currentStyleId = prop.currentStyleId;
        }
        if(!prop.pivot){
            prop.pivot = {
                x: 0,
                y: 0
            }
        } else {

        }
        // 设置缩放的时候同时会把中心点的距离给缩放了，这个一定要设置，不然缩放的时候中心点会跑偏
        prop.pivot.x  = prop.pivot.x / prop.scale.x;
        prop.pivot.y  = prop.pivot.y / prop.scale.y;

        // 标记克隆体的母体
        this.origin = prop.origin || null;


        this.position.x = Utils.math.Strip(prop.x) || 0;
        this.position.y = Utils.math.Strip(prop.y) || 0;

        this.x = this.position.x || 0;
        this.y = -this.position.y || 0;

        // 这里会改变position的大小，背景不要设置缩放，默认就是拉伸到全屏
        if(prop.type != 'background'){
            this.setScale({
                x: prop.scale ? prop.scale.x : 1,
                y: prop.scale ? prop.scale.y : 1,
            });
            // this.adjustPosition(prop);
        }

        if(prop.type != 'background'){
            if (prop.width) {
                this.width = Utils.math.Strip(prop.width);
            }
            if (prop.height) {
                this.height = Utils.math.Strip(prop.height);
            }
        }

        if (prop.mirror === 3) {
            this.scale.y *= -1;
            this.scale.x *= -1;
        } else if (prop.mirror === 2) {
            this.scale.y *= -1;
        } else if (prop.mirror) {
            this.scale.x *= -1;
        }

        this.visible = !!prop.visible;

        this.interactive = true;
        // 锚点为中心点
        this.anchor.set(.5);

        this._config = prop || {}; // 原始配置信息，克隆体用
    }

    setScale(scale) {
        this.scale.set(scale.x , scale.y);

        this.position.x += this.pivot.x * (this.scale.x - 1);
        this.position.y += this.pivot.y * (this.scale.y - 1);

        this.x = this.position.x;
        this.y = this.position.y;
    }
}