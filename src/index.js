import App from './core/render/index';

const app = new App({
    width: 375,
    height: 667,
    options: null,
    config: {
        mainScene: 'scene1',
        scenes: {
            scene1: {
                sprites: ['bg', 'hero', 'bullet']
            }
        },
        sprites: {
            'bg': {
                name: 'bg',
                type: 'background',
                properties: {
                    x: 0,
                    y: 0,
                    width: 750,
                    height: 1334
                }
            },
            'hero': {
                name: 'hero',
                type: 'sprite',
                properties: {
                    // x: 0,
                    // y: 0,
                    // width: 750,
                    // height: 1334
                }
            },
            'bullet': {
                name: 'bullet',
                type: 'sprite',
                properties: {
                    // x: 0,
                    // y: 0,
                    // width: 750,
                    // height: 1334
                }
            }
        },
        styles: {
            bg_style: {
                type: 'background',
                name: '星空',
                frame: [
                    {
                        id: '1',
                        url: 'assets/bg.jpg'
                    }
                ]
            },
            hero_style: {
                type: 'sprite',
                name: '主战机',
                frame: [
                    {
                        id: '1',
                        url: 'assets/hero.png'
                    }
                ]
            },
            bullet_style: {
                type: 'sprite',
                name: '子弹',
                frame: [    
                    {
                        id: '1',
                        url: 'assets/bullet.png'
                    }
                ]
            }
        }
    }
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

app.start();

// create a new Sprite from an image path.

// let sprites = {}

// const loader = new PIXI.Loader();

// loader
//     .add('bg', 'assets/bg.jpg')
//     .add('hero', 'assets/hero.png')
//     .add('bullet', 'assets/bullet.png')

// loader.load((loader, resources) => {

//     sprites.bg = PIXI.Sprite.from(resources.bg.texture)
//     sprites.hero = PIXI.Sprite.from(resources.hero.texture)
//     sprites.bullet = PIXI.Sprite.from(resources.bullet.texture)


//     app.stage.addChild(sprites.bg);
//     app.stage.addChild(sprites.hero);
//     app.stage.addChild(sprites.bullet);
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