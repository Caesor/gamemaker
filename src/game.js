export default {
    mainScene: 'scene1',
    scenes: {
        scene1: {
            sprites: ['bg', 'hero', 'bullet'
            ]
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