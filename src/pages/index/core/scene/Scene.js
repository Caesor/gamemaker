export default class Scene extends PIXI.Container {
    constructor(id, game) {
        super();

        this.installPlugins(game);
    }

    installPlugins() {
        game.plugins.installToScene(this);
    }

    update() {

    }
}