import Scene from  './Scene.js'

export default class SceneManager {
    constructor(game, sceneConfig) {
        this.game = game;
        
        this.scenes = {};
    }

    createScene(id, sceneConfig) {
        const scene = new Scene(id, game);

        // bind life cycle
        const lifeCycle = [ 'init', 'preload', 'create', 'update', 'render' ];

        for (let i = 0; i < lifeCycle.length; i++){
            const sceneCallback = sceneConfig[lifeCycle[i]];
            // lifecycle function
            if (sceneCallback){
                scene[lifeCycle[i]] = sceneCallback;
            }
        }

        this.scenes[id] = scene;

        this.currentScene = scene;

        this.game.stage.addChild(scene);
    }

    update() {
        this.scenes[this.currentScene].update();
    }

    render() {

    }
}