import Map from '../src/ol/Map.js';
import View from '../src/ol/View.js';
import TileLayer from '../src/ol/layer/Tile.js';
// import {OSM, TileDebugAsync} from '../src/ol/source.js';
import {OSM, GlTiles} from '../src/ol/source.js';


const map = new Map({
  layers: [
//     new TileLayer({
//       source: new OSM()
//     }),
    new TileLayer({
      source: new GlTiles({
        fragmentShader: `
        void main(void) {
          //gl_FragColor = vec4(0.2, vTextureCoords,0.5);

          vec4 texelColour = texture2D(uTexture0, vec2(vTextureCoords.s, vTextureCoords.t));

          gl_FragColor = vec4(texelColour.gbr, 1.0);
        }
        `,
        textureSources: [
          new OSM()
        ]
      })
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 0],
    zoom: 1
  })
});
