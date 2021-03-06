import Outline from "./outline";
const BtnBigSize = 30;
const BtnSmallSize = 20;
export default class Circle extends Outline {
    constructor(sprite){
        super(sprite);
    }
    updateOutline(width, height) {
        const radius = width > height ? width / 2 : height / 2;
        this.outline.clear();
        this.outline.beginFill(0x000000, 0.01);
        this.outline.lineStyle(1, 0x27AD8A);
        this.outline.drawCircle(0, 0, radius);
        this.outline.endFill();
        Object.assign(this.bounds, { type:'circle', width, height, radius });
    }
    updateBtns() {
        this.scaleBtn.x = Math.sqrt(2) * this.bounds.radius / 2;
        this.scaleBtn.y = this.scaleBtn.x;

        if(this.bounds.radius * 2 <= 80) {
            this.scaleBtn.width = BtnSmallSize;
            this.scaleBtn.height = BtnSmallSize;
        }else {
            this.scaleBtn.width = BtnBigSize;
            this.scaleBtn.height = BtnBigSize;
        }
    }
}