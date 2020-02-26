import Map from '../src/ol/Map.js';
import View from '../src/ol/View.js';
import TileLayer from '../src/ol/layer/Tile.js';
import OSM from '../src/ol/source/OSM.js';
import COG from '../src/ol/source/COG.js';
import XYZ from '../src/ol/source/XYZ.js';
import {fromLonLat} from 'ol/proj';

const map = new Map({
  layers: [
    new TileLayer({
      source: new OSM()
    }),
    new TileLayer({
      source: new COG({url:'http://oin-hotosm.s3.amazonaws.com/5a00a35831eff4000c380570/0/b87bbaed-f735-4c31-a84d-0bc86a6055fe.tif'})
    }),
    // new TileLayer({
    //   source: new XYZ({url:'https://tiles.openaerialmap.org/5a00a35831eff4000c380570/0/b87bbaed-f735-4c31-a84d-0bc86a6055fe/{z}/{x}/{y}.png'})
    // }),
  ],
  target: 'map',
  view: new View({
    center: fromLonLat([-17.3831647, 14.7703649]),
    zoom: 16
  })
});
