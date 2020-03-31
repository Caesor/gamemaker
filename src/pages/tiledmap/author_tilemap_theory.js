
const frag = `
      precision mediump float;
      uniform sampler2D map, tiles;
      uniform vec2 mapSize, tileSize;
      varying vec2 uv;
      void main() {
        vec2 tileCoord = floor(255.0 * texture2D(map, floor(uv) / mapSize).ra);
        gl_FragColor = texture2D(tiles, (tileCoord + fract(uv)) / tileSize);
      }`

const vert = `
      precision mediump float;
      attribute vec2 position;
      uniform vec4 view;
      varying vec2 uv;
      void main() {
        uv = mix(view.xw, view.zy, 0.5 * (1.0 + position));
        gl_Position = vec4(position, 1, 1);
      }`

const parseMap = (map) =>
{
    var data = [];
    let count = 0;

    for (var i = 0; i < map.length; i++)
    {
        for (var j = 0; j < map[i].length; j++)
        {
            data[count++] = map[i][j][0];
            data[count++] = 0
            data[count++] = 0;
            data[count++] = map[i][j][1];
        }
    }

    return new Uint8Array( data )
}

const jsonPath = 'https://regl-project.github.io/regl/www/gallery/assets/map.json'
const tilePath = 'https://regl-project.github.io/regl/www/gallery/assets/tiles.png'

const loader = new PIXI.Loader()
.add([jsonPath, tilePath])
.load((out)=>{


    const mapData = out.resources[jsonPath].data;
    const mapWidth = mapData[0].length;
    const mapHeight =  mapData.length;

    const map = PIXI.BaseTexture.fromBuffer(  parseMap(mapData) , mapWidth, mapHeight );

    const tiles = PIXI.Texture.from(tilePath);

    tiles.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    tiles.baseTexture.mipmap = false;

    // make a shader..
    const shader = PIXI.Shader.from(vert, frag, {
        map,
        tiles,
        tileSize: [16.0, 16.0],
        mapSize: [16.0, 16.0],
        view:[0,0,0,0]
    })

    // make a geometry..
    const geometry = new PIXI.Geometry()
    .addAttribute('position', [ -1, -1, 1, -1, -1, 1, 1, 1, -1, 1, 1, -1 ]);

    const tileMesh = new PIXI.RawMesh(geometry, shader);

    // done.. add it to stage!
    app.stage.addChild(tileMesh);

    // add some movement..
    let x = 0;
    let y = 0;

    app.stage.interactive = true;

    app.stage.mousemove = e => {
        x = e.data.global.x * 0.5;
        y = e.data.global.y * 0.6;
    }

    // update tick..
    app.ticker.add(()=>{

        const boxX = mapWidth * x / app.screen.width
        const boxY = mapHeight * y / app.screen.height
        const boxH = 10
        const boxW = app.screen.width / app.screen.height * boxH

        shader.uniforms.view = [boxX - 0.5 * boxW,
                                boxY - 0.5 * boxH,
                                boxX + 0.5 * boxW,
                                boxY + 0.5 * boxH]

    })

    app.renderer.resize(window.innerWidth, window.innerHeight);
});

// resize with logo..
window.addEventListener('resize', ()=>{

  //  app.renderer.resize(window.innerWidth, window.innerHeight);
});

const app = new PIXI.Application(window.innerWidth, window.innerHeight, {resolution:1, clearBeforeRender:false, autoResize:true, backgroundColor:0x333333})

document.body.appendChild(app.renderer.view);
document.body.style.margin = 0;
//budo index.js --live -- -t babelify