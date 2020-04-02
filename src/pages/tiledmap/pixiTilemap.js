import * as PIXI from 'pixi.js'
Window.PIXI = PIXI;
import 'pixi-tilemap';


var renderer = PIXI.autoDetectRenderer(800, 600);
document.body.appendChild(renderer.view);

var loader = new PIXI.Loader();
loader
    .add('atlas', 'assets/atlas.json')
    .add('map', 'assets/testmap.json')
    .add('tilesets', 'assets/untitled.png')
    .load(function(loader, resources) {
        // const tilemap = new PIXI.tilemap.CompositeRectTileLayer(0, [resources['atlas_image'].texture]);
        const tilemap = new PIXI.tilemap.CompositeRectTileLayer(0, [resources['tilesets'].texture]);

        const { tileheight, tilewidth } = resources.map.data;
        const { data, width, height } = resources.map.data.layers[0];
       
        // bah, im too lazy, i just want to specify filenames from atlas
        for(let i = 0; i < height; i++) {
            for(let j = 0; j < width; j++) {
                tilemap.addFrame(data[i * width + j], j * tilewidth, i * tileheight);
            }
        }
        //  var size = 32;
        // for (var i=0;i<7;i++)
        //     for (var j=0;j<7;j++) {
        //         tilemap.addFrame("grass.png", i*size, j*size);
        //         if (i%2==1 && j%2==1)
        //             tilemap.addFrame("tough.png", i*size, j*size);
        //     }

        // // if you are lawful citizen, please use textures from the loader
        // var textures = resources.atlas.textures;
        // tilemap.addFrame(textures["brick.png"], 2*size, 2*size);
        // tilemap.addFrame(textures["brick_wall.png"], 2*size, 3*size);

        renderer.render(tilemap);
    });