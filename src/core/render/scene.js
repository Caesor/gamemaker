import * as PIXI from 'pixi.js'
import Sprite from './sprite';
import Background from './background';

export default class Scene extends PIXI.Container{
    constructor(id, options) {
        super();
        this.id = id;
        this.sprites = options.sprites;
        this.styles = options.styles;
       
        this.init();
    }
    
    init() {
        const that = this;
        this.sprites.forEach( opt => {
            let sprite;
            switch(opt.type) {
                case 'sprite':
                    sprite = new Sprite(opt.id, that.styles[opt.currentStyle], opt);
                    break;
                case 'background':
                    sprite = new Background(opt.id, that.styles[opt.currentStyle], opt);
                    break;
                    
            }
            this.addChild(sprite);
            
        })
    }
}