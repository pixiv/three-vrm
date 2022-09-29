/* eslint-env node */

import packageJson from './package.json';
import serve from 'rollup-plugin-serve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

// == constants ====================================================================================
/** copyright text */
const copyright = '(c) 2020-2022 pixiv Inc.';

/** name of the license */
const licenseName = 'MIT License';

/** url of the license */
const licenseUri = 'https://github.com/pixiv/three-vrm/blob/release/LICENSE';

/** output name of the module */
const globalName = 'THREE_VRM_MATERIALS_V0COMPAT';

/** filename of output */
const filename = 'lib/three-vrm-materials-v0compat';

// == envs =========================================================================================
const NODE_ENV = process.env.NODE_ENV;
const DEV = NODE_ENV === 'development';
const WATCH = process.env.ROLLUP_WATCH === 'true';

// == banner =======================================================================================
const bannerTextDev = `/*!
 * ${packageJson.name} v${packageJson.version}
 * ${packageJson.description}
 *
 * Copyright ${copyright}
 * ${packageJson.name} is distributed under ${licenseName}
 * ${licenseUri}
 */`;

const bannerTextProd = `/*! ${copyright} - ${licenseUri} */`;

// == module =======================================================================================
/** will be used to inject the stuff into THREE */
const outro = `Object.assign(THREE, exports);`;

// == serve ========================================================================================
const serveOptions = {
  contentBase: '.',
  port: process.env.PORT ?? 10001,
};

// == config =======================================================================================
function createOutputOptions( { esm } ) {
  let file = filename;
  file += esm ? '.module' : '';
  file += DEV ? '' : '.min';
  file += '.js';

  return {
    file,
    format: esm ? 'esm' : 'umd',
    name: esm ? undefined : globalName,
    banner: DEV ? bannerTextDev : bannerTextProd,
    globals: esm ? undefined : { three: 'THREE' },
    sourcemap: DEV ? 'inline' : false,
    plugins: [
      ...( DEV ? [] : [
        terser(),
      ] ),
      ...( WATCH ? [
        serve( serveOptions )
      ] : [] ),
    ],
    outro: esm ? undefined : outro,
  };
}

function createConfig( output ) {
  return {
    input: 'src/index.ts',
    output,
    external: [ 'three' ],
    plugins: [
      typescript(),
    ],
  };
};

// == output =======================================================================================
export default [
  createConfig( [
    createOutputOptions( {} ),
    createOutputOptions( { esm: true } ),
  ] ),
];
