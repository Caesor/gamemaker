import * as PIXI from 'pixi.js'
import Sprite from './sprite';

export default class Scene extends PIXI.Container{
    constructor(id, options) {
        super();
		const { sprites } = options;

		this.id = id;
        this.sprites = sprites;
        
        this.init();
    }
    
    init() {
        this.sprites.forEach( it => {
            const opt = {
                name: sprite.name,
                width: sprite.width,
                height: sprite.height,
            }

            const sprite = new Sprite(id, texture, opt);

            this.addChild(sprite);
        })
    }
}