const Luban = {
    // PluginCache: require('./PluginCache'),
    GameObjects: require('./gameobjects'),
    Game: require('./game')
}

module.exports = Luban;

global.Luban = Luban;

const py = new Luban.Game();