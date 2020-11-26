/* eslint-env node */

import banner from 'rollup-plugin-banner';
import packageJson from './package.json';
import serve from 'rollup-plugin-serve';
import { string } from 'rollup-plugin-string';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

// == constants ====================================================================================
const copyright = '(c) 2019-2020 pixiv Inc.';
const licenseName = 'MIT License';
const licenseUri = 'https://github.com/pixiv/three-vrm/blob/master/LICENSE';

// == envs =========================================================================================
const NODE_ENV = process.env.NODE_ENV;
const DEV = NODE_ENV === 'development';
const ESM = process.env.ESM === '1';
const SERVE = process.env.SERVE === '1';

// == banner =======================================================================================
// uses `output.banner` in dev mode, since sourcemap matters
const bannerTextDev = `/*!
* ${packageJson.name} v${packageJson.version}
* ${packageJson.description}
*
* Copyright ${copyright}
* ${packageJson.name} is distributed under ${licenseName}
* ${licenseUri}
*/`;

// uses `rollup-plugin-banner` in prod mode, since terser removes the `output.banner` one
const bannerTextProd = `${copyright} - ${licenseUri}`;

// == serve ========================================================================================
const serveOptions = {
  contentBase: '.',
};

// == output =======================================================================================
export default {
  input: ESM ? 'src/index.ts' : 'src/assign.ts',
  output: {
    format: ESM ? 'esm' : 'umd',
    banner: DEV ? bannerTextDev : null,
    sourcemap: DEV ? 'inline' : false,
    globals: ESM ? undefined : {
      three: 'THREE',
    }
  },
  external: [ 'three' ],
  plugins: [
    string({
      include: ['**/*.frag', '**/*.vert'],
    }),
    typescript(),
    ...(DEV ? [] : [terser()]),
    ...(SERVE ? [serve(serveOptions)] : []),
    ...(DEV ? [] : [banner(bannerTextProd)]),
  ],
};
