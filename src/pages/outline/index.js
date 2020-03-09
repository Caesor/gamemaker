import * as PIXI from 'pixi.js'
import Loader from '@/components/loader';
import Outline from '@/components/outline';
import Circle from '@/components/circle';
import Polygon from '@/components/polygon'
import config from '@/config/default.json';
import * as utils from '@/libs/area.js'

import { getOutline } from '@/libs/collision/outline';
import { convexHullOfPoints } from '@/libs/collision/geom'

const STAGE_WIDTH = 1000;
const STAGE_HEIGHT = 800;

const app = new PIXI.Application({
    transparent: true,
    width: STAGE_WIDTH,
    height: STAGE_HEIGHT
});
document.body.appendChild(app.view);

const spriteList = Object.values(config.components).filter(s => s.type === 'sprite');
const playground = new PIXI.Container();
app.stage.addChild(playground);
// playground.pivot.set(-STAGE_WIDTH / 2, -STAGE_HEIGHT / 2);
playground.x = 200;
playground.y = 200;


const loaderManager = new Loader({
    onProgress: (progress = 0) => {

    },
    onComplete: (resource) => {
        console.log('sprite number:', spriteList.length)
        for(let i = 0; i < spriteList.length; i++) {
            const { id, name, styles } = spriteList[i];
            const texture = resource[config.styles[styles[0]].frame[0].id];
            // const texture = resource['1_-_-ChBJdrSHbGhNYIzdu-qovOdnEAEYzdCD5AU'];
            const sprite = new PIXI.Sprite(texture);
            sprite.id = id;
            sprite.name = name;
            const w = sprite.width;
            const h = sprite.height;
            if(w > h) {
                sprite.width = 200
                sprite.height = h / w * 200;
            }else {
                sprite.height = 200;
                sprite.width =  w / h * 200;
            }
            // const imageData = utils.getImageData(texture.baseTexture.resource.source, sprite.width, sprite.height)
            // sprite.area = utils.getArea(imageData);
            // const points = getOutline(imageData, sprite.width, sprite.height);
            // sprite.points = convexHullOfPoints(points);
            // console.log(name, '点:', sprite.points.length - 1, sprite.points);
            // console.log(parseInt(sprite.width), parseInt(sprite.height), sprite.name, sprite.area)
            sprite.x = (i % 4) * 220;
            sprite.y = Math.floor(i/4) * 300;
            sprite.anchor.set(0.5)
            playground.addChild(sprite);


            var img_width = texture.frame.width,
            img_height = texture.frame.height;
            const { width, height } = sprite;
            const canvas = document.createElement("canvas");
            var width1 = canvas.width = texture.width;
            var height2 = canvas.height = texture.height;
            // canvas.width = width;
            // canvas.height = height;
            var ctx = canvas.getContext("2d");
            ctx.clearRect(0, 0, width1, height2);
            ctx.drawImage(texture.baseTexture.resource.source, texture.frame.x || 0, texture.frame.y || 0, img_width, img_height, 0, 0, img_width, img_height);
            //console.log('画图', Date.now() - startTime);
            var colorData = ctx.getImageData(0, 0, width1, height2).data;
            //console.log('获取像素数据', Date.now() - startTime);
            // debugger;
            // 获取描边数据点，无序的。
            var points = getOutline(colorData, width1, height2);
            //console.log('获取描边数据点', Date.now() - startTime);
            // 凸包算法找出多边形点集合
            var points = convexHullOfPoints(points);
            //console.log('凸包', Date.now() - startTime);
            // console.log(JSON.stringify(points));
            // 转化为数组格式
            // console.error('总耗时', Date.now() - startTime);
            var points = transformPolygon(points, width1, height2, sprite)
            console.log('描边大小', points.length);

            // const ctrl = new Polygon(sprite);
            const ctrl = new PIXI.Graphics();
            ctrl.beginFill(0x000000, 0.01);
            ctrl.lineStyle(1, 0x27AD8A);
            const path = points.map( ({x, y}) => {
                return new PIXI.Point(x, y);
            })
            ctrl.drawPolygon(path);
            ctrl.endFill();
            ctrl.x = (i % 4) * 220;
            ctrl.y = Math.floor(i/4) * 300;
            // ctrl.anchor.set(0.5)
            // const ctrl = new Circle(sprite);
            // const ctrl = new Outline(sprite, 'circle')
            playground.addChild(ctrl);
        }
    },
    onError: e => {
        console.error(e);
    }
});


function transformPolygon(polygon, width, height, sprite){
    let newPoints = [];
    const { scale, position } = sprite;
    polygon.forEach(point => {// 以图片的中心点为原点坐标转换，然后得到世界坐标转换。
        let p = {
            x: (point.x - width / 2) * scale.x + position.x,
            y: (point.y - height / 2) * scale.y + position.y
        };
        // 处理旋转角度
        // p = makePointRotate(this.position, p, this.rotationValue)
        // p = this.adjustPositionByPoint(p);
        newPoints.push(p);
    });
    return newPoints;
}
function makePointRotate(start, end, angle) {
    let offsetX = end.x - start.x;
    let offsetY = end.y - start.y;

    let cos = Math.cos(angle);
    let sin = Math.sin(angle);

    return {
        x: start.x + offsetX * cos - offsetY * sin,
        y: start.y + offsetY * cos + offsetX * sin
    }
}

loaderManager.load(config.styles);