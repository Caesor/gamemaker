import * as PIXI from 'pixi.js'

const app = new PIXI.Application({ transparent: true });
document.body.appendChild(app.view);

// create a new Sprite from an image path.
let sprites = {}

const loader = new PIXI.Loader();

loader
    .add('bg', 'assets/bg.jpg')
    .add('hero', 'assets/hero.png')
    .add('bullet', 'assets/bullet.png')

loader.load((loader, resources) => {

    sprites.bg = PIXI.Sprite.from(resources.bg.texture)
    sprites.hero = PIXI.Sprite.from(resources.hero.texture)
    sprites.bullet = PIXI.Sprite.from(resources.bullet.texture)


    app.stage.addChild(sprites.bg);
    app.stage.addChild(sprites.hero);
    app.stage.addChild(sprites.bullet);
});
// center the sprite's anchor point
// start.anchor.set(0.5);

// // move the sprite to the center of the screen
// start.x = app.screen.width / 2;
// start.y = app.screen.height / 2;



// app.ticker.add(() => {
//     // just for fun, let's rotate mr rabbit a little
//     start.rotation += 0.1;
// });