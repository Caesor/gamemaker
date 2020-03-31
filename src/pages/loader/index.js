import * as PIXI from 'pixi.js';
window.PIXI = PIXI;
import "pixi-spine";
import "pixi-heaven";

// const app = new PIXI.Application({ transparent: true });
// document.body.appendChild(app.view);

// const loader = new PIXI.Loader(); // you can also create your own if you want

// const sprites = {};

// // Chainable `add` to enqueue a resource
// loader.add('bunny', 'https://res.wx.qq.com/wechatgame/product/cdn/luban/hero_408acbf6.png')
//       .add('spaceship', 'https://res.wx.qq.com/wechatgame/product/cdn/luban/hero_408acbf6.png')
//       .add('scoreFont', 'https://res.wx.qq.com/wechatgame/product/cdn/luban/hero_408acbf6.png');

// // The `load` method loads the queue of resources, and calls the passed in callback called once all
// // resources have loaded.
// loader.load((loader, resources) => {
//     // resources is an object where the key is the name of the resource loaded and the value is the resource object.
//     // They have a couple default properties:
//     // - `url`: The URL that the resource was loaded from
//     // - `error`: The error that happened when trying to load (if any)
//     // - `data`: The raw data that was loaded
//     // also may contain other properties based on the middleware that runs.
//     sprites.bunny = new PIXI.heaven.Sprite(resources.bunny.texture);
//     sprites.spaceship = new PIXI.Sprite(resources.spaceship.texture);
//     sprites.scoreFont = new PIXI.Sprite(resources.scoreFont.texture);

//     sprites.bunny.x = 200;
//     sprites.bunny.y = 200;
//     app.stage.addChild(sprites.bunny);

//     // sprites.bunny.tint = 0x80ff80;
//     // sprites.bunny.convertToHeaven();
//     // app.stage.addChild(sprites.spaceship);
//     // app.stage.addChild(sprites.scoreFont);
//     let phase = 0;
//     sprites.bunny.color.setDark(1, 1, 1);
//     // app.ticker.add(() => {
//     //     phase += 0.1;
//     //     const x = Math.sin(phase) * 0.25 + 0.25;
//     //     sprites.bunny.color.setDark(x, x, x);
//     // });
// });



// const l = {
//     'bunny': 'https://res.wx.qq.com/wechatgame/product/cdn/luban/hero_408acbf6.png',
//     'spaceship': 'https://res.wx.qq.com/wechatgame/product/cdn/luban/hero_408acbf6.png',
//     'scoreFont': 'https://res.wx.qq.com/wechatgame/product/cdn/luban/hero_408acbf6.png'
// }

// function loadResourceByScene(list){
//     return new Promise((resolve, reject) => {
//         loader.load((loader, resources) => {
//             // resources is an object where the key is the name of the resource loaded and the value is the resource object.
//             // They have a couple default properties:
//             // - `url`: The URL that the resource was loaded from
//             // - `error`: The error that happened when trying to load (if any)
//             // - `data`: The raw data that was loaded
//             // also may contain other properties based on the middleware that runs.
//             sprites.bunny = new PIXI.TilingSprite(resources.bunny.texture);
//             sprites.spaceship = new PIXI.TilingSprite(resources.spaceship.texture);
//             sprites.scoreFont = new PIXI.TilingSprite(resources.scoreFont.texture);
//             console.log(1111)
//         });     
//     })
// }

const app = new PIXI.Application({ backgroundColor: 0x1099bb });
document.body.appendChild(app.view);

// create a new Sprite from an image path
const bunny = new PIXI.heaven.Sprite(PIXI.Texture.from('https://pixijs.io/examples/examples/assets/bunny.png'));

// Let us invert the colors!
// bunny.color.setLight(0.0, 0.0, 0.0);
// bunny.color.setDark(1.0, 1.0, 1.0);

// center the sprite's anchor point
bunny.anchor.set(0.5);
bunny.scale.set(3.0);

// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

// Listen for animate update
app.ticker.add((delta) => {
    // just for fun, let's rotate mr rabbit a little
    // delta is 1 if running at 100% performance
    // creates frame-independent transformation
    bunny.rotation += 0.1 * delta;
});