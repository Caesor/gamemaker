import * as PIXI from 'pixi.js'

import Loader from './loader';
import Loading from './loading';
import Scene from './scene';

export default class app extends PIXI.Application {
    constructor({ width, height, options, config }) {
        super(width, height, options);
        this.config = config;
        // stage 可交互
        this.stage.interactive = true;
        // stage 可点击
        this.stage.hitArea = new PIXI.Rectangle(-width / 2, -height / 2, width, height);
        // 坐标系以屏幕中心为原点
        this.stage.pivot.set(-width / 2, -height / 2);

        this.scenes = new PIXI.Container;
        this.stage.addChild(this.scenes);

        this.init();
    }

    init() {
        this.loading = new Loading(this);

        this.loaderManager = new Loader({
            onProgress: progress => {
                this.loading.show();
                this.loading.text(progress + '%');
            },
            onComplete: () => {
                this.loading.hide();
            },
            onError: e => {
                this.loading.text('网络错误');
                console.error(e);
            }
        });

        // this.initScene(this.config.mainScene);
        this.loaderManager.load(this.config.styles);
    }

    start() {
        if (!this.loaderManager.loader.loading && this.loaderManager.resourcesLoadComplete ) {
            this.launchFirstScene('1');
        } else {
            this.loaderManager.addComplete(() => {
                this.launchFirstScene('1');
            });
        }
    }

    // initScene(id) {
    //     const { sprites: all, style } = this.config; 
    //     const { sprites } = this.config.scenes[id];
    //     const list = sprites.map( sp => {

    //         return 
    //     });

    //     this.loaderManager.load(list)
    // }

    launchFirstScene(id) {
        const scene = new Scene(id, this.config);

        this.scenes.addChild(scene);

        this.currentScene = scene;
    }
}