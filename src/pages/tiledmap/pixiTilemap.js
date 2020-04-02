import * as PIXI from 'pixi.js'
Window.PIXI = PIXI;
import 'pixi-tilemap';


// var renderer = PIXI.autoDetectRenderer(800, 600);
// document.body.appendChild(renderer.view);

// var loader = new PIXI.Loader();
// loader
//     .add('map', 'assets/testmap.json')
//     .add('texture', 'assets/untitled.png')
//     .load(function(loader, resources) {
//         // const tilemap = new PIXI.tilemap.CompositeRectTileLayer(0, [resources['atlas_image'].texture]);
//         const tilemap = new PIXI.tilemap.CompositeRectTileLayer(0, [resources['texture'].texture]);

//         const { tileheight, tilewidth } = resources.map.data;
//         const { data, width, height } = resources.map.data.layers[0];

//         // bah, im too lazy, i just want to specify filenames from atlas
//         for(let i = 0; i < height; i++) {
//             for(let j = 0; j < width; j++) {
//                 tilemap.addFrame(data[i * width + j], j * tilewidth, i * tileheight);
//             }
//         }
//         //  var size = 32;
//         // for (var i=0;i<7;i++)
//         //     for (var j=0;j<7;j++) {
//         //         tilemap.addFrame("grass.png", i*size, j*size);
//         //         if (i%2==1 && j%2==1)
//         //             tilemap.addFrame("tough.png", i*size, j*size);
//         //     }

//         // // if you are lawful citizen, please use textures from the loader
//         // var textures = resources.atlas.textures;
//         // tilemap.addFrame(textures["brick.png"], 2*size, 2*size);
//         // tilemap.addFrame(textures["brick_wall.png"], 2*size, 3*size);

//         renderer.render(tilemap);
//     });

var TIME = 0;
var resolutionX = 1024;
var resolutionY = 720;

var stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom);

var app = new PIXI.Application(resolutionX, resolutionY);
document.body.appendChild(app.view);

// We need to load the tileset image resource and the exported json file from tiled that stores the tilemap and tileset data
PIXI.loader.add(["imgs/Viking3.png", "imgs/island.json"]).load(setup);

function setup(loader, resources) {
	PIXI.tilemap.Constant.boundSize = 2048;
	PIXI.tilemap.Constant.bufferSize = 4096;
	console.log(loader, resources);
	var island = resources["imgs/island.json"].data;

	// Here we take the first tileset in the tiled file. If you have multiple, you might need to do something different
	var tileset = island.tilesets[0];
	var {
		tileheight,
		tilewidth,
		tilecount
	} = tileset;

	var TILESET = new TileSet({
		tilewidth,
		tileheight,
		texture: PIXI.utils.TextureCache["imgs/Viking3.png"],
		offset: 1,
		count: tilecount,
		tileset,
		scaleMode: PIXI.SCALE_MODES.NEAREST
	});

	var TILEMAP = new PIXI.tilemap.CompositeRectTileLayer(0);
	app.stage.addChild(TILEMAP);

	island.layers.forEach(layer => {
		if (!layer.visible) return;
		if (layer.type === "objectgroup") {
			layer.objects.forEach(object => {
				var {
					gid,
					id,
					width,
					height,
					x,
					y,
					visible
				} = object;
				if (visible === false) return;
				if (TILESET.getFrame(gid)) {
					TILEMAP.addFrame(TILESET.getFrame(gid), x, y - tileheight);
				}
			});
		} else if (layer.type === "tilelayer") {
			var ind = 0;
			for (var i = 0; i < layer.height; i++) {
				for (var j = 0; j < layer.width; j++) {
					var xPos = tilewidth * j;
					var yPos = tileheight * i;

					var tileUid = layer.data[ind];

					if (tileUid !== 0) {
						var tileData = tileset.tiles.find(
							tile => tile.id === tileUid - 1
						);

						// Animated tiles have a limitation with only being able to use frames arranged one to each other on the image resource
						if (tileData && tileData.animation) {
							TILEMAP.addFrame(
								TILESET.getFrame(tileUid),
								xPos,
								yPos
							).tileAnimX(tilewidth, tileData.animation.length);
						} else {
							// Non animated props dont require tileAnimX or Y
							TILEMAP.addFrame(TILESET.getFrame(tileUid), xPos, yPos);
						}
					}

					ind += 1;
				}
			}
			app.start();
		}
	});
	gameLoop();
}

// For tracking stats
function gameLoop() {
	stats.begin();
	stats.end();
	requestAnimationFrame(gameLoop);
}

// We increment time by one whenever we want to progress all tile animations
setInterval(() => {
	TIME += 1;
	// tileAnim[0] will move time on the X axis, while tileAnim[1] on the Y
	app.renderer.plugins.tilemap.tileAnim[0] = TIME;
	app.renderer.render(app.stage);
}, 100);