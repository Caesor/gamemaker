import * as PIXI from 'pixi.js'
import Sprite from './sprite';
import Background from './background';
import ControlBox from '../components/controlBox'

export default class Scene extends PIXI.Container{
    constructor(id, options) {
        super();
        this.id = id;
        this.sprites = options.sprites;
        this.textures = options.textures;
        this.styles = options.styles
       
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
                    const ctl = new ControlBox(sprite);
                    this.addChild(ctl);
                    break;
                case 'background':
                    sprite = new Background(opt.id, this.textures[opt.currentStyle], opt);
                    break;
                    
            }
            this.addChild(sprite);
            
        })
    }
}