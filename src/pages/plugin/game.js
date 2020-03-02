const PluginCache = require('./PluginCache')

class Game {
    constructor() {
        this.init()
    }

    init() {
        console.log('game init');
        let go = PluginCache.getCore('GameObjects');
        console.log(go)
    }
}

module.exports = Game;