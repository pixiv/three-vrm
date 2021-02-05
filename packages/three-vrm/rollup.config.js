/* eslint-env node */

import packageJson from './package.json';
import serve from 'rollup-plugin-serve';
import { string } from 'rollup-plugin-string';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

// == constants ====================================================================================
/** copyright text */
const copyright = '(c) 2019-2021 pixiv Inc.';

/** name of the license */
const licenseName = 'MIT License';

/** url of the license */
const licenseUri = 'https://github.com/pixiv/three-vrm/blob/release/LICENSE';

/** output name of the module */
const name = 'THREE_VRM';

// == envs =========================================================================================
const NODE_ENV = process.env.NODE_ENV;
const DEV = NODE_ENV === 'development';
const ESM = process.env.ESM === '1';
const SERVE = process.env.SERVE === '1';

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
};

// == output =======================================================================================
export default {
  input: 'src/index.ts',
  output: {
    format: ESM ? 'esm' : 'umd',
    banner: DEV ? bannerTextDev : bannerTextProd,
    sourcemap: DEV ? 'inline' : false,
    globals: ESM ? undefined : { three: 'THREE' },
    name: ESM ? undefined : name,
    outro: ESM ? undefined : outro,
  },
  external: [ 'three' ],
  plugins: [
    string({
      include: ['**/*.frag', '**/*.vert'],
    }),
    typescript(),
    ...(DEV ? [] : [terser()]),
    ...(SERVE ? [serve(serveOptions)] : []),
  ],
};
