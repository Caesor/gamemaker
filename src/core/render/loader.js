import * as PIXI from 'pixi.js'

export default class Loader {
    constructor(opt) {
        this.loader = new PIXI.Loader();

        this.bindHooks(opt)
    }

    bindHooks({ onProgress, onComplete, onError }) {
        this.loader.onProgress.add((e) => {
            onProgress && onProgress(e.progress);
        });

        this.loader.onError.add(() => {
            onError && onError();
        });

        this.loader.onComplete.add((loader, resources) => {
            this.resources = resources;

            // this.parseSpriteSheet();
            let startTime = Date.now();
            for (let key in resources) {
                this.textures[key] = new PIXI.Texture(new PIXI.BaseTexture(resources[key].data));
            }
            console.log('总耗时', Date.now() - startTime);

            this.resourcesLoadComplete = true;

            onComplete && onComplete();
        });
    }

    addComplete(onComplete) {
        this.loader.onComplete.add(() => {
            onComplete && onComplete()
        });
    }

    load(styles) {
        const list = Object.keys(styles);

        for(let i = 0; i < list.length; i++) {
            this.loader.add(styles[list[i]].frame[0]);
        }
        // list.forEach(({id, path}) => {
        //     this.loader.add(id, path);
        // });
        // 开始加载
        this.loader.load();
    }
}