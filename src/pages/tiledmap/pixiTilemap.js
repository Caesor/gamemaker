import * as PIXI from 'pixi.js'
Window.PIXI = PIXI;
import 'pixi-tilemap';
import TileSet from './TileSet.js'

var TIME = 0;
var resolutionX = 1024;
var resolutionY = 720;
var app = new PIXI.Application(resolutionX, resolutionY);
document.body.appendChild(app.view);

// We need to load the tileset image resource and the exported json file from tiled that stores the tilemap and tileset data
app.loader.baseUrl = './assets/';
// app.loader.baseUrl = './assets/pixi-tiled';
app.loader
	// .add('map', 'desert.json')
    // .add('texture', "tmw_desert_spacing.png")
    .add('map', 'level.json')
    .add('texture', 'kenney-tileset-64px-extruded.png')
    // .add('map', 'testmap.json')
    // .add('texture', 'untitled.png')
	.load(setup);

var TILEMAP;

function setup(loader, resources) {
	PIXI.tilemap.Constant.boundSize = 2048;
	PIXI.tilemap.Constant.bufferSize = 4096;
	console.log(loader, resources);
	var island = resources["map"].data;

	// Here we take the first tileset in the tiled file. If you have multiple, you might need to do something different
	var tileset = island.tilesets[0];
	var { tileheight, tilewidth, tilecount, margin, spacing } = tileset;

	var TILESET = new TileSet({
		tilewidth,
		tileheight,
		texture: PIXI.utils.TextureCache["texture"],
		count: tilecount,
		scaleMode: PIXI.SCALE_MODES.NEAREST,
		option: {
			offset: 1,
			margin, spacing,
		}
	});

	TILEMAP = new PIXI.tilemap.CompositeRectTileLayer(0);
	app.stage.addChild(TILEMAP);

	island.layers.forEach(layer => {
		if (!layer.visible) return;
		if (layer.type === "objectgroup") {
			layer.objects.forEach(object => {
				var { gid, id, width, height, x, y, visible } = object;
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
							TILEMAP.addFrame(TILESET.getFrame(tileUid), xPos, yPos)
								.tileAnimX(tilewidth, tileData.animation.length);
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
	TILEMAP.x -= 1;
	TILEMAP.y -= 1;
	requestAnimationFrame(gameLoop);
}

// We increment time by one whenever we want to progress all tile animations
setInterval(() => {
	TIME += 1;
	// tileAnim[0] will move time on the X axis, while tileAnim[1] on the Y
	app.renderer.plugins.tilemap.tileAnim[0] = TIME;
	app.renderer.render(app.stage);
}, 100);