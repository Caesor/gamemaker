import * as PIXI from 'pixi.js'

import App from './core/render/index';
import Sprite from './core/render/sprite';
// import config from './game'
import config from './game1.json'

// const app = new PIXI.Application({
//     width: 375,
//     height: 667
// });
const app = new App({
    width: 375,
    height: 667,
    options: null,
    config
});

document.body.appendChild(app.view);

// app.loadScene({
//     resources: [
//         {
//             id: 'bg',
//             path: 'assets/bg.jpg'
//         },
//         {
//             id: 'hero',
//             path: 'assets/hero.png'
//         },
//         {
//             id: 'bullet',
//             path: 'assets/bullet.png'
//         }
//     ]
// })

// app.start();

// create a new Sprite from an image path.

// const scenes = new PIXI.Container;
//         app.stage.addChild(scenes);

// let sprites = {}

// const loader = new PIXI.Loader();

// loader
//     .add('bg', 'assets/bg.jpg')
//     .add('hero', 'assets/hero.png')
//     .add('bullet', 'assets/bullet.png')

// loader.load((loader, resources) => {

//     sprites.bg = new Sprite('bg', new PIXI.Texture(new PIXI.BaseTexture(resources.bg.data)), {})
//     // sprites.bg = Sprite.from(resources.bg.texture)
//     sprites.hero = new Sprite('hero', new PIXI.Texture(new PIXI.BaseTexture(resources.hero.data)), {})
//     sprites.bullet = new Sprite('bullet', new PIXI.Texture(new PIXI.BaseTexture(resources.bullet.data)), {})

//     scenes.addChild(sprites.bg);
//     scenes.addChild(sprites.hero);
//     scenes.addChild(sprites.bullet);
// });
// center the sprite's anchor point
// start.anchor.set(0.5);

// // move the sprite to the center of the screen
// start.x = app.screen.width / 2;
// start.y = app.screen.height / 2;



// app.ticker.add(() => {
//     // just for fun, let's rotate mr rabbit a little
//     start.rotation += 0.1;
// });