import * as PIXI from 'pixi.js';

export default class PixiSprite extends PIXI.Sprite {
    constructor(id, texture, options, app, notEvent) {

        texture ? super(texture) : super();
        this.application = app;
        this.id = id;
    }
}