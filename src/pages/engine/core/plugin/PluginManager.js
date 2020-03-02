import EventEmitter from 'eventemitter3'

export default class PluginManager extends EventEmitter {
    constructor(){
        EventEmitter.call(this);
    }

    installToScene() {
        
    }
}