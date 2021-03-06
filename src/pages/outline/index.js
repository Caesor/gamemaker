import * as PIXI from 'pixi.js'
import Loader from '@/components/loader';
import ControlBox from '@/components/controlBox';
import Rect from '@/components/outline';
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
        const startTime = Date.now();
        console.log('sprite number:', spriteList.length)
        // for(let i = 0; i < spriteList.length; i++) {
            const { id, name, styles } = spriteList[0];
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
            
            // sprite.x = (i % 4) * 220;
            // sprite.y = Math.floor(i/4) * 300;
            sprite.anchor.set(0.5)
            playground.addChild(sprite);

            const textureWidth = texture.width;
            const textureHeight = texture.height;

            const imageData = utils.getImageData(texture);
            const imageArea = utils.getArea(imageData);
            const r = textureWidth > textureHeight ? textureWidth / 2: textureHeight / 2;
            const circle = Math.PI * Math.pow(r, 2);
            const rect = textureWidth * textureHeight;
            console.log('area', imageArea, circle, rect);

            const select = (circle - imageArea) < (rect - imageArea) ? 'circle' : 'rect'
            let ctrl;
            // if(select === 'circle') {
                // ctrl = new Circle(sprite);
            // }else {
                ctrl = new ControlBox(sprite)
            // }
            // 1.获取描边数据点，无序的
            // 2.凸包算法找出多边形点集合
            let points = convexHullOfPoints(getOutline(imageData, textureWidth, textureHeight));
            // // 3.坐标变换
            points = transformPolygon(points, textureWidth, textureHeight, sprite)
            // console.log('描边大小', points.length);

            sprite.points = points;
            // const ctrl = new Polygon(sprite);
            // const ctrl = new PIXI.Graphics();
            // ctrl.beginFill(0x000000, 0.01);
            // ctrl.lineStyle(1, 0x27AD8A);
            // const path = points.map( ({x, y}) => {
            //     return new PIXI.Point(x, y);
            // })
            // ctrl.drawPolygon(path);
            // ctrl.endFill();
            // const ctrl = new Circle(sprite);
            // const ctrl = new Rect(sprite)
            playground.addChild(ctrl);
            console.log(`计算耗时：${Date.now() - startTime}ms`);
        // }
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
        newPoints.push(p);
    });
    return newPoints;
}

loaderManager.load(config.styles);