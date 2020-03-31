import * as PIXI from 'pixi.js'

export default class Map {
    constructor(opt={}){
        const { container, tilewidth, tileheight, height, width } = opt;

        this.tilewidth = tilewidth;
        this.tileheight = tileheight;
        this.height = height;
        this.width = width;

        this.mapWidth = tilewidth * width;
        this.mapHeight = tileheight * height;
        
        this.app = new PIXI.Application({
            transparent: true,
            width: this.mapWidth,
            height: this.mapHeight
        });
        container.appendChild(this.app.view);
        this.stage = this.app.stage;

        this.map = [];

        this.drawGrid();
    }

    drawGrid(){
        var stage = new PIXI.Container();//The stage is the root container that will hold everything in our scene
        this.app.stage.addChild(stage)
        // grid shader
        var uniforms = {};
        uniforms.vpw = this.mapWidth;
        uniforms.vph = this.mapHeight;
        uniforms.offset = { type: 'v2', value: { x: -0.0235, y: 0.9794}}
        uniforms.pitch = { type: 'v2', value: { x: 50, y: 50}}
        uniforms.resolution = { type: 'v2', value: { x: this.mapWidth, y: this.mapHeight}};

        var gridShader = new PIXI.Filter(null, fragment, uniforms);
        const rect = new PIXI.Graphics().drawRect(0, 0, this.mapWidth, this.mapHeight);
        rect.filters = [gridShader];
        stage.addChild(rect);

        // this is the main render call that makes pixi draw your container and its children.
        this.app.renderer.render(stage);
    }

}

const fragment = `
precision mediump float;

uniform float vpw; // Width, in pixels
uniform float vph; // Height, in pixels

uniform vec2 offset; // e.g. [-0.023500000000000434 0.9794000000000017], currently the same as the x/y offset in the mvMatrix
uniform vec2 pitch;  // e.g. [50 50]

void main() {
  float lX = gl_FragCoord.x / vpw;
  float lY = gl_FragCoord.y / vph;

  float scaleFactor = 10000.0;

  float offX = (scaleFactor * offset[0]) + gl_FragCoord.x;
  float offY = (scaleFactor * offset[1]) + (1.0 - gl_FragCoord.y);

  if (int(mod(offX, pitch[0])) == 0 ||
      int(mod(offY, pitch[1])) == 0) {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.5);
  } else {
    gl_FragColor = vec4(1.0, 1.0, 1.0, 1.0);
  }
}
`