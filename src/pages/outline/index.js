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
            const { width, height } = sprite;

            if(width > height) {
                sprite.width = 200
                sprite.height = height / width * 200;
            }else {
                sprite.height = 200;
                sprite.width =  width / height * 200;
            }
            const imageData = utils.getImageData(texture.baseTexture.resource.source, sprite.width, sprite.height)
            sprite.area = utils.getArea(imageData);
            const points = getOutline(imageData, sprite.width, sprite.height);
            sprite.points = convexHullOfPoints(points);
            console.log(name, '点:', sprite.points.length - 1, sprite.points);
            console.log(parseInt(sprite.width), parseInt(sprite.height), sprite.name, sprite.area)
            sprite.x = (i % 4) * 220;
            sprite.y = Math.floor(i/4) * 300;
            sprite.anchor.set(0.5)
            playground.addChild(sprite);

            // const ctrl = new Polygon(sprite);
            const ctrl = new PIXI.Graphics();
            ctrl.beginFill(0x000000, 0.01);
            ctrl.lineStyle(1, 0x27AD8A);
            const path = sprite.points.map( ({x, y}) => {
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

loaderManager.load(config.styles);