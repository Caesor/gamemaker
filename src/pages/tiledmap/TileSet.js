export default class TileSet {
    constructor({ tilewidth, tileheight, texture, option, count, scaleMode}) {
        this.tilewidth = tilewidth;
        this.tileheight = tileheight;
        this.option = option || {}
        this.texture = texture;
        this.textureCache = [];
        this.scaleMode = scaleMode || PIXI.SCALE_MODES.NEAREST;
        this.prepareTextures(count);
    }
    get width() {
        return this.texture.width;
    }
    get height() {
        return this.texture.height;
    }
    prepareTextures(count) {
        const size = count || (this.width / this.tilewidth) * (this.height / this.tileheight);
        this.textureCache = new Array(size).fill(0).map((_, frame) => this.prepareTexture(frame));
    }
    prepareTexture(frame) {
        const { offset = 1, margin = 0, spacing = 0 } = this.option;
        const cols = Math.floor(this.width / this.tilewidth);
        const x = margin + ((frame - offset) % cols) * (this.tilewidth + spacing);
        const y = margin + Math.floor((frame - offset) / cols) * (this.tileheight + spacing);
        const rect = new PIXI.Rectangle(x, y, this.tilewidth, this.tileheight);
        const texture = new PIXI.Texture(this.texture, rect);

        texture.baseTexture.scaleMode = this.scaleMode;
        texture.cacheAsBitmap = true;

        return texture;
    }
    getFrame(frame) {
        if (!this.textureCache[frame]) {
            this.prepareTexture(frame);
        }

        return this.textureCache[frame];
    }
}