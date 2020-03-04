import * as PIXI from 'pixi.js';
import Outline from './outline';

export default class Polygon extends Outline {
    constructor(sprite){
        super(sprite);
    }
    updateOutline(width, height) {
        this.outline.clear();
        this.outline.beginFill(0x000000, 0.01);
        this.outline.lineStyle(1, 0x27AD8A);
        const path = this.sprite.points.map( ({x, y}) => {
            return new PIXI.Point(x, y);
        })
        this.outline.drawPolygon(path);
        this.outline.endFill();
        Object.assign(this.bounds, { width, height });
    }
}