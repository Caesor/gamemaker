import * as PIXI from 'pixi.js';

const PixelRatio = 1;
export default class Loading extends PIXI.Container{
    constructor(w, h) {
        super();
        this.init(w, h);   
    }

    init(w, h) {
        const bg = new PIXI.Sprite(new PIXI.Texture.from('https://wximg.qq.com/wxgame/minigamemaker/preview.jpeg'));
        bg.x = 0;
        bg.y = 0;
        bg.width = w;
        bg.height = h;
        bg.anchor.set(0.5);
        this.addChild(bg);
        // text
        const textLabel = new PIXI.Text();
        textLabel.text = "";
        textLabel.anchor.set(.5);
        textLabel.x = 0;
        textLabel.y = 100;
        const textLabelStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 12 * PixelRatio,
            fontStyle: '',
            fill: '#EEEEEEE',
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 440
        });
        textLabel.style = textLabelStyle;
        this.textLabel = textLabel;
        this.addChild(textLabel);

        this.hide();
    }
    text(text) {
        this.textLabel.text = text;
    }
    show() {
        this.visible = true;
    }
    hide() {
        this.visible = false;
    }
}
