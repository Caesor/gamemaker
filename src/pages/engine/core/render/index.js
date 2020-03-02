import * as PIXI from 'pixi.js'

import Loader from './loader';
import Loading from './loading';
import Scene from './scene';
import Sprite from './sprite';
import AABB from '@/collision/AABB.js';

export default class app extends PIXI.Application {
    constructor({ width, height, options, config }) {
        super({ width, height, options });

        this.config = config;
        // stage 可交互
        this.stage.interactive = true;
        // stage 可点击
        this.stage.hitArea = new PIXI.Rectangle(-width / 2, -height / 2, width, height);
        // 坐标系以屏幕中心为原点
        this.stage.pivot.set(-width / 2, -height / 2);

        this.stageReady = false;
        this.currentScene = null;
        this.init();
    }

    init() {
        const { width, height } = this.screen;

        this.loading = new Loading(width, height);
        this.stage.addChild(this.loading);

        this.loaderManager = new Loader({
            onProgress: (progress = 0) => {
                progress = Math.min(progress, 100);
                this.loading.show();
                this.loading.text(progress + '%');
            },
            onComplete: (resource) => {
                this.stageReady = true;
                this.loading.hide();
                // start
                this.loadScene(this.config.mainScene);
            },
            onError: e => {
                this.loading.text('网络错误');
                console.error(e);
            }
        });

        // 全部加载
        this.loaderManager.load(this.config.styles);
    }

    loadScene(id) {
        const spritesList = this.config.scenes[id].sprites;
        const targets = spritesList.map( id => {
            const layer = this.config.sprites[id];
            const origin  = this.config.components[layer.origin];
            return {
                ...origin,
                properties: {
                    ...origin.properties,
                    ...layer.properties
                }
            };
        })
        const scene = new Scene(id, {
            sprites: targets,
            textures: this.loaderManager.textures,
            styles: this.config.styles
        });

        this.stage.addChild(scene);
        this.currentScene = scene;
    }

    update() {
        if(!this.stageReady) {
            return false;
        }
        this.detectCollition();
    }

    detectCollition() {
        const sprites = this.currentScene.getSpriteList();
        const len = sprites.length;

        for(let i = 0; i < len; i++) {
            for(let j = i + 1; j < len; j++) {
                // AABB
                const s1 = sprites[i].getBounds();
                const s2 = sprites[j].getBounds();
                const result = AABB(s1, s2);
                if(result) {
                    console.log(sprites[i].name, sprites[j].name);
                }
            }
        }
    }
}