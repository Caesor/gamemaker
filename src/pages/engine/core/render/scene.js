import * as PIXI from 'pixi.js'
import Sprite from './sprite';
import Background from './background';
import ControlBox from '@/components/controlBox'

export default class Scene extends PIXI.Container{
    constructor(id, options) {
        super();
        this.id = id;
        this.sprites = options.sprites;
        this.textures = options.textures;
        this.styles = options.styles
       
        this.list = [];
        this.init();
    }
    
    init() {
        this.sprites.forEach( opt => {
            let sprite;
            const { type, id, currentStyle } = opt;
            switch(opt.type) {
                case 'sprite':
                    // get first frame
                    let texture = this.textures[this.styles[opt.currentStyle].frame[0].id];
                    sprite = new Sprite(opt.id, texture, opt);
                    this.addChild(sprite);

                    this.list.push(sprite);

                    const ctrl = new ControlBox(sprite);
                    this.addChild(ctrl);
                    break;
                case 'background':
                    sprite = new Background(opt.id, this.textures[opt.currentStyle], opt);

                    this.addChild(sprite);
                    break;       
            }
        })
    }

    update() {
        
    }

    getSpriteList() {
        return this.list;
    }
}