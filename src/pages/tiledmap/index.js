import Map from './map.js'
import Editor from './editor.js'

const container = document.querySelector('#map');

class TiledMapEditor {
    constructor(){
        this.config = {
            container: container,
            tilewidth: 32,
            tileheight: 32,
            width: 20,
            height: 20
        }
        this.map = new Map(this.config);

        this.editor = new Editor(this.config);
    }
}

new TiledMapEditor();

