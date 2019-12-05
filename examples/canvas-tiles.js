import Map from '../src/ol/Map.js';
import View from '../src/ol/View.js';
import TileLayer from '../src/ol/layer/Tile.js';
// import {OSM, TileDebugAsync} from '../src/ol/source.js';
import {OSM, GlTiles} from '../src/ol/source.js';


const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new TileLayer({
      source: new GlTiles({
        fragmentShader: `
        void main(void) {
          gl_FragColor = vec4(0.2, vTextureCoords,0.5);
        }
        `
      })
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 1
  })
});
