import * as PIXI from 'pixi.js'
import ControlBox from './core/components/controlBox/index'
const app = new PIXI.Application({ transparent: true });
document.body.appendChild(app.view);

// create a new Sprite from an image path.
const bunny = PIXI.Sprite.from('https://res.wx.qq.com/wechatgame/product/cdn/luban/hero_408acbf6.png');

// center the sprite's anchor point
bunny.anchor.set(0.5);


// move the sprite to the center of the screen
bunny.x = app.screen.width / 2;
bunny.y = app.screen.height / 2;

app.stage.addChild(bunny);

setTimeout(() => {
    const ctl = new ControlBox(bunny, );
    app.stage.addChild(ctl);
}, 200)

// import App from './core/render/index';
// import config from './config.json'
// import { getOutline } from './core/render/collision/outline';
// import { convexHullOfPoints } from './core/render/collision/geom'
// const app = new App({
//     width: 375,
//     height: 667,
//     options: null,
//     config
// });

// document.body.appendChild(app.view);



// const {components, styles} = config;


// for(let sprite in styles) {
//     const { name, frame, type } = styles[sprite];
    
//     if(type === 'sprite') {
//         const canvas = document.createElement("canvas");
//         const ctx = canvas.getContext("2d");
//         document.body.appendChild(canvas);
        
//         let img = new Image();
//         img.crossOrigin = 'anonymous';
//         img.onload = function() {
//             const width = canvas.width = this.width;
//             const height = canvas.height = this.height;

//             ctx.clearRect(0, 0, width, height);
//             ctx.drawImage(this, 0, 0, width, height)

//             const colorData = ctx.getImageData(0, 0, width, height).data;

//             const points = getOutline(colorData, width, height);
//             ctx.strokeStyle = "blue";

//             for(let i = 0; i < points.length; i++) {    
//                 ctx.beginPath();
//                 ctx.arc(points[i].x, points[i].y, 1, 0, 2 * Math.PI);
//                 ctx.stroke();
//             }

//             const selectedPoints = convexHullOfPoints(points);

//             console.log(name, '点:', selectedPoints.length - 1);
//             ctx.strokeStyle = "red";
//             ctx.fillStyle = "red";
//             ctx.beginPath();
//             ctx.moveTo(selectedPoints[0].x, selectedPoints[0].y);
//             for(let j = 1; j < selectedPoints.length; j++) {
//                 ctx.lineTo(selectedPoints[j].x, selectedPoints[j].y);
//             }
//             ctx.stroke();
//         }
//         img.src = frame[0].url;      
//     }
// }
