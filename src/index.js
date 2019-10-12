import * as PIXI from 'pixi.js'

const app = new PIXI.Application({ transparent: true });
document.body.appendChild(app.view);

// create a new Sprite from an image path.
const start = PIXI.Sprite.from('assets/start.png');

// center the sprite's anchor point
start.anchor.set(0.5);

// move the sprite to the center of the screen
start.x = app.screen.width / 2;
start.y = app.screen.height / 2;

app.stage.addChild(start);

app.ticker.add(() => {
    // just for fun, let's rotate mr rabbit a little
    start.rotation += 0.1;
});