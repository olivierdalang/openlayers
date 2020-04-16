import Map from '../src/ol/Map.js';
import View from '../src/ol/View.js';
import TileLayer from '../src/ol/layer/Tile.js';
// import {OSM, TileDebugAsync} from '../src/ol/source.js';
import {OSM, GlTiles} from '../src/ol/source.js';

// const GEOTIFF = 'data/geotiff/PNOA_MDT200_EPSG3857_Valencia_8bit.tiff';
const GEOTIFF = 'http://oin-hotosm.s3.amazonaws.com/5a00a35831eff4000c380570/0/b87bbaed-f735-4c31-a84d-0bc86a6055fe.tif';
// const GEOTIFF = 'https://inondations-dakar.org/dataset/6d0ec6a3-3a7b-4dd4-8f52-bebd19036b68/resource/5db64207-b35e-4595-9727-81c43935c16a/download/feaab57e-98e0-46ec-8ca8-19d07d9ef618.tif';

GeoTIFF.fromUrl(GEOTIFF).then(
  function(loadedGeoTiff) {

const map = new Map({
  layers: [
    //     new TileLayer({
    //       source: new OSM()
    //     }),
    new TileLayer({
      source: new GlTiles({
        fragmentShader: `
        void main(void) {
          vec4 texelColour = texture2D(uTexture0, vec2(vTextureCoords.s, vTextureCoords.t));
          gl_FragColor = vec4(texelColour.gbr, 1.0);

          vec4 texelElevation = texture2D(uTexture1, vec2(vTextureCoords.s, vTextureCoords.t));
          if (texelElevation.x > 0.) {

            vec4 colours[5];
            colours[0] = vec4(.0, .0, .8, 0.);
            colours[1] = vec4(.4, .55, .3, 0.01);
            colours[2] = vec4(.9, .9, .6, 150.);
            colours[3] = vec4(.6, .4, .3, 500.);
            colours[4] = vec4(1., 1., 1., 4000.);

            // Init pixel color to first stop, to get the blending right.
            vec4 pixelColor = colours[0];

            for (int i=0; i < 4; i++) {
              // Do a smoothstep of the heights between steps. If the result is > 0
              // (meaning "the height is higher than the lower bound of this step"),
              // then replace the colour with a linear blend of the step.
              // If the result is 1, this means that the real colour will be applied
              // in a later loop.

              pixelColor.rgb = mix(
                pixelColor.rgb,
                colours[i+1].rgb,
                smoothstep( colours[i].a, colours[i+1].a, texelElevation.x * 256.)
              );
            }

            gl_FragColor.rgb = pixelColor.rgb;
          }

// 					gl_FragColor.rgb = min(vec3(1.) - texelElevation.xxx, texelColour.gbr);
//           gl_FragColor.a = 1.;
        }
        `,
        textureSources: [
          new OSM(),
          loadedGeoTiff
        ]
      })
    })
  ],
  target: 'map',
  view: new View({
    center: [0, 4800000],
    zoom: 7
  })
});

  }
)

