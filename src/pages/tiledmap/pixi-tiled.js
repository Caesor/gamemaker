import {Inject, CreateStage} from "pixiv5-tiled"
import * as PIXI from "pixi.js"


Inject(PIXI, { injectMiddleware: false, debugContainers: true });

var app = new PIXI.Application({
	width: 800,
	height: 600,
});

document.body.appendChild(app.view);

//load map with dependencies
// app.loader.baseUrl = './assets/pixi-tiled';
app.loader.baseUrl = './assets/';
app.loader
    // .add('map', 'desert.json')
    // .add('texture', "tmw_desert_spacing.png")
    // .add('map', 'level.json')
    // .add('texture', 'kenney-tileset-64px-extruded.png')
    .add('map', 'testmap.json')
    .add('texture', 'untitled.png')
	.load(loaded);

function loaded() {
	const data = app.loader.resources['map'].data;
	const tex = app.loader.resources['texture'].texture;

	const create = CreateStage({
		"untitled": tex
    }, data);
    
    create.x = 20;
    create.y = 100;

	app.stage.addChild(create);

	app.ticker.add(gameLoop);
}

function gameLoop(dt) {}
