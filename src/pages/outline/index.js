import * as PIXI from 'pixi.js'
import Loader from '@/pages/index/core/render/loader';
import ControlBox from '@/components/controlBox';
import Outline from '@/components/outline';
import config from '@/config/default.json';
import getArea from '@/libs/area.js'

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
            sprite.area = getArea(texture.baseTexture.resource.source, sprite.width, sprite.height);
            console.log(sprite.width, sprite.height, sprite.name, sprite.area)
            sprite.x = (i % 4) * 220;
            sprite.y = Math.floor(i/4) * 300;
            sprite.anchor.set(0.5)
            playground.addChild(sprite);

            const ctrl = new Outline(sprite);
            playground.addChild(ctrl);
        }
    },
    onError: e => {
        console.error(e);
    }
});

loaderManager.load(config.styles);