import * as PIXI from 'pixi.js';

export default class Loading {
    constructor(app) {
        this.PixelRatio = 1;
        
        this.app = app;

        this.C = new PIXI.Container;
        app.stage.addChild(this.C);

        this.init();
        this.hide();
    }
    init() {
        const bg = new PIXI.Sprite(new PIXI.Texture.from('https://wximg.qq.com/wxgame/minigamemaker/preview.jpeg'));
        bg.x = 0;
        bg.y = 0;
        bg.width = this.app.gameWidth;
        bg.height = this.app.gameHeight;
        bg.anchor.set(0.5);
        this.C.addChild(bg);
        // text
        const textLabel = new PIXI.Text();
        textLabel.text = "";
        textLabel.anchor.set(.5);
        textLabel.x = 0;
        textLabel.y = 100;
        const textLabelStyle = new PIXI.TextStyle({
            fontFamily: 'Arial',
            fontSize: 12 * this.PixelRatio,
            fontStyle: '',
            fill: '#EEEEEEE',
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 440
        });
        textLabel.style = textLabelStyle;
        this.textLabel = textLabel;
        this.C.addChild(textLabel);

    }
    text(text) {
        this.textLabel.text = text;
    }
    show() {
        this.C.visible = true;
    }
    hide() {
        this.C.visible = false;
    }
}
