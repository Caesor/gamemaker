import Polygon from '@/collision/sat/Polygon'
import Point from '@/collision/sat/Point'
import QuadTree from './QuadTree';

const POLYGONS = [
    [new Point(0, 0), new Point(0, 50), new Point(50, 50)],
    // [new Point(0, 0), new Point(0, 50), new Point(50, 50), new Point(50, 0)],
    [new Point(20, 0), new Point(0, 50), new Point(50, 50), new Point(70, 0)],
    [new Point(20, 0), new Point(40, 0), new Point(60, 20), new Point(60, 40), new Point(40, 60), new Point(20, 60), new Point(0, 40), new Point(0, 20)],
    [new Point(20, 0), new Point(40, 0), new Point(60, 25), new Point(40, 50), new Point(20, 50), new Point(0, 25)]
];
const COLORS = ['blue', 'yellow', 'red', 'green', 'pink'];

export default class Test {
    constructor(num, canvas) {
        this.canvas = canvas || document.getElementById('canvas');
        this.context = this.canvas.getContext('2d');

        this.shapes = [];
        this.num = num || 100;

        this.quadtree = new QuadTree({
            x:0, y:0, width: 375, height: 667
        });
        
        this.timer = null;
        this.elapsed = [];

        this.init();
        this.loop = this.loop.bind(this);
    }

    init() {
        for(let i = 0; i < this.num; i++) {
            // random select from 3\4\6\8 polygon
            const index = Math.round(Math.random() * 3);
            const polygon = new Polygon(i, COLORS[index]);
            // console.log(index)
            const points = POLYGONS[index];
        
            points.forEach( point => {
                polygon.addPoint(point.x, point.y);
            });
        
            // move to random position
            const random_x = Math.random() * 375;
            const random_y = Math.random() * 667;
            polygon.move(random_x, random_y);
        
            // give the shape a speed
            polygon.vx = (Math.random() > 0.5 ? 1 : -1 )* Math.ceil(Math.random() * 5);
            polygon.vy = (Math.random() > 0.5 ? 1 : -1 )* Math.ceil(Math.random() * 5);
            this.shapes.push(polygon);
        }

        this.drawShapes();
        
        // console.log('all: ', this.shapes)
    }

    start() {
        this.timer = requestAnimationFrame(this.loop);
    }

    stop() {
        cancelAnimationFrame(this.timer);
        // console.log(this.elapsed);
        const abandon = this.elapsed.filter( t => t > 16).length;

        const average = this.elapsed.reduce( (a, b) => a + b) / this.elapsed.length;
        // console.log(this.elapsed.length, abandon);
        console.log((abandon / this.elapsed.length * 100).toFixed(2) + '%', this.counter, average);
        // this.shapes.map(s => {
        //     console.log(s.id, s.collisionList);
        // })
    }

    loop() {
        // move shapes
        this.shapes.forEach(shape => {
            const { vx, vy } = shape;
            shape.move(vx, vy);
            const rect = shape.getBounds();
            rect.id = shape.id;
            rect.source = shape;
            this.quadtree.insert(rect);
        });

        this.context.clearRect(0, 0, canvas.width, canvas.height);

        this.drawShapes();

        let start = Date.now();
        // this.counter = this.detectCollisions();
        this.counter = this.detectCollisionsByQuadTree();
        let diff = Date.now() - start;
        // console.log(diff);
        this.elapsed.push(diff);

        this.timer = requestAnimationFrame(this.loop);

        this.quadtree.clear();
    }

    drawShapes() {
        this.shapes.forEach( (shape, index) => {
            shape.stroke(this.context);
            shape.fill(this.context);
            const {x,y,width,height} = shape.getBounds();
            shape.drawIndex(this.context, index, x + width/2, y + height/2);
        });
    }

    detectCollisions() {
        let counter = 0;
        for (let i = 0; i < this.shapes.length; i++) {
            const shape1 = this.shapes[i];
            for(let j = i + 1; j < this.shapes.length; j++) {
                const shape2 = this.shapes[j];
                counter++;
                if (shape1.collidesWith(shape2)) {
                    // console.log(shape1.points.length, shape2.points.length, shape1.fillStyle, shape2.fillStyle)
                    // console.log('------------------------')
                }
            }
        }
        return counter;
    }

    detectCollisionsByQuadTree(){
        let counter = 0;
        for (let i = 0; i < this.shapes.length; i++) {
            const shape1 = this.shapes[i];
            // 清除碰撞历史
            // shape1.collisionList.length = 0;
            const result = this.quadtree.retrieve(shape1.getBounds());
            for(let j = 0; j < result.length; j++) {
                const shape2 = result[j];
                // 剔除已经进过遍历检测的shape
                if(shape2.id <= i) {
                    continue;
                }
                counter++;
                if (shape1.collidesWith(shape2.source)) {
                    // 记录碰撞对
                    // shape1.collisionList.push(shape2.id);
                    shape1.changeColor();
                    shape2.source.changeColor();
                    // console.log(shape1.points.length, shape2.points.length, shape1.fillStyle, shape2.fillStyle)
                    // console.log('------------------------')
                }
            }
        }
        return counter;
    }
}

