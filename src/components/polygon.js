import * as PIXI from 'pixi.js';
import Outline from './outline';

export default class Polygon extends Outline {
    constructor(sprite){
        super(sprite, {
            scaleBtn: false,
            outline: {
                properties: {
                    interactive: false
                },
                events: null
            }
        });
        // this.points = [];
        // this.initPoints(sprite.points);
    }
    init(sprite){
        
        this.points = [];
        for(let j = 0; j < sprite.points.length; j++) {
            // const { x, y} = points[j];
            this.points[j] = new PIXI.Graphics();
            this.points[j].interactive = true;
            this.points[j].cursor = 'move';
            this.points[j].on('pointerdown', this.polygonCtrlPointDragStart.bind(this, j));
            this.points[j].on('pointermove', this.polygonCtrlPointDragMove.bind(this, j));
            this.points[j].on('pointerup', this.polygonCtrlPointDragEnd.bind(this, j));
            this.points[j].on('pointerupoutside', this.polygonCtrlPointDragEnd.bind(this, j));
            this.addChild(this.points[j]);
        }
        super.init(sprite);
    }
    updateOutline() {
        const { x, y, points } = this.sprite;
        this.outline.position.x = x;
        this.outline.position.y = y;
        this.outline.clear();
        this.outline.beginFill(0x000000, 0.01);
        this.outline.lineStyle(2, 0x27AD8A);
        this.outline.moveTo(points[0].x, points[0].y);
        this.drawPoint(this.points[0], points[0].x, points[0].y);
        for(let i = 1; i < points.length; i++){
            this.drawPoint(this.points[i], points[i].x, points[i].y);
            this.outline.lineTo(points[i].x, points[i].y);
        }
        this.outline.closePath();
        this.outline.endFill();
        Object.assign(this.bounds, { points });
    }

    drawPoint(point, x, y){
        point.clear();
        point.beginFill(0x000000, 0.01);
        point.lineStyle(2, 0x27AD8A);
        point.drawCircle(x, y, 4)
        point.endFill();
    }

    polygonCtrlPointDragStart(index, e){
        console.log(index)
        this.draggingPointIndex = index;
        const { x, y } = e.data.getLocalPosition(this.parent);
        this.pre = {x, y};
    }

    polygonCtrlPointDragMove(index, e){
        if(this.draggingPointIndex === index){
            const { x, y } = e.data.getLocalPosition(this.parent);
            const point = this.sprite.points[index];
            point.x += x - this.pre.x;
            point.y += y - this.pre.y;
            this.pre = {x,y};
            this.updateOutline();
        }
    }

    polygonCtrlPointDragEnd(index, e){
        this.draggingPointIndex = false;
        this.diff = null;
    }
}