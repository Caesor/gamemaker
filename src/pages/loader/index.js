import * as PIXI from 'pixi.js';

const app = new PIXI.Application({ transparent: true });
document.body.appendChild(app.view);

const loader = new PIXI.Loader(); // you can also create your own if you want

const sprites = {};

// Chainable `add` to enqueue a resource
loader.add('bunny', 'https://res.wx.qq.com/wechatgame/product/cdn/luban/hero_408acbf6.png')
      .add('spaceship', 'https://res.wx.qq.com/wechatgame/product/cdn/luban/hero_408acbf6.png')
      .add('scoreFont', 'https://res.wx.qq.com/wechatgame/product/cdn/luban/hero_408acbf6.png');

// The `load` method loads the queue of resources, and calls the passed in callback called once all
// resources have loaded.
loader.load((loader, resources) => {
    // resources is an object where the key is the name of the resource loaded and the value is the resource object.
    // They have a couple default properties:
    // - `url`: The URL that the resource was loaded from
    // - `error`: The error that happened when trying to load (if any)
    // - `data`: The raw data that was loaded
    // also may contain other properties based on the middleware that runs.
    sprites.bunny = new PIXI.TilingSprite(resources.bunny.texture);
    sprites.spaceship = new PIXI.TilingSprite(resources.spaceship.texture);
    sprites.scoreFont = new PIXI.TilingSprite(resources.scoreFont.texture);
    console.log(1111)
});

const l = {
    'bunny': 'https://res.wx.qq.com/wechatgame/product/cdn/luban/hero_408acbf6.png',
    'spaceship': 'https://res.wx.qq.com/wechatgame/product/cdn/luban/hero_408acbf6.png',
    'scoreFont': 'https://res.wx.qq.com/wechatgame/product/cdn/luban/hero_408acbf6.png'
}

function loadResourceByScene(list){
    return new Promise((resolve, reject) => {
        loader.load((loader, resources) => {
            // resources is an object where the key is the name of the resource loaded and the value is the resource object.
            // They have a couple default properties:
            // - `url`: The URL that the resource was loaded from
            // - `error`: The error that happened when trying to load (if any)
            // - `data`: The raw data that was loaded
            // also may contain other properties based on the middleware that runs.
            sprites.bunny = new PIXI.TilingSprite(resources.bunny.texture);
            sprites.spaceship = new PIXI.TilingSprite(resources.spaceship.texture);
            sprites.scoreFont = new PIXI.TilingSprite(resources.scoreFont.texture);
            console.log(1111)
        });     
    })
}