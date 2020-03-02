const PluginCache = require('./PluginCache')

class GameObjects {
    constructor(){

    }
    hello() {
        console.log('hello')
    }
}

PluginCache.register('GameObjects', GameObjects, 'make');

module.exports = GameObjects;



