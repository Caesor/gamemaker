import Config from './Config'
import EventEmitter from 'eventemitter3'
import PluginManager from './plugin/PluginManager'

export default class Game {
    constructor(config) {
        this.config = new Config(config);

        this.render = null;

        this.plugins = new PluginManager();

        this.events = new EventEmitter();
    }
}