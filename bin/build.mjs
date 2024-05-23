// @ts-check
import esbuild from 'esbuild';
import path from 'node:path';
import fs from 'node:fs/promises';

// == envs =========================================================================================
const NODE_ENV = process.env.NODE_ENV;
const DEV = NODE_ENV === 'development';
const SERVE = process.env.SERVE === '1';
const PORT = parseInt(process.env.PORT || '10001', 10);
const minifySuffix = DEV ? '' : '.min';

// == build =========================================================================================

const workDir = process.argv[2] ? path.join(process.cwd(), process.argv[2]) : process.cwd();
await buildPackage(workDir);

// == implement =====================================================================================

/**
 * @typedef {{ name: string, version: string, description: string, module: string }} PackageJson
 */

/**
 *
 * @param {string} absWorkingDir
 */
async function buildPackage(absWorkingDir) {
  /**
   * @type {PackageJson}
   */
  const packageJson = JSON.parse(await fs.readFile(path.join(absWorkingDir, './package.json'), 'utf-8'));

  // == constants ====================================================================================
  /** copyright text */
  const copyright = '(c) 2019-2024 pixiv Inc.';

  /** name of the license */
  const licenseName = 'MIT License';

  /** url of the license */
  const licenseUri = 'https://github.com/pixiv/three-vrm/blob/release/LICENSE';

  /** filename of output */
  const filename = packageJson.name.split('/').at(-1) || 'index';

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

  /**
   * @param {'esm' | 'cjs'} format
   */
  const entryPoints = (format) => {
    const esmSuffix = format === 'esm' ? '.module' : '';
    const outFilename = filename + esmSuffix + minifySuffix;
    return {
      entryPoints: {
        [outFilename]: 'src/index.ts',
      },
      format,
    };
  };

  /**
   * @type {import('esbuild').BuildOptions}
   */
  const buildOptions = {
    banner: {
      js: DEV ? bannerTextDev : bannerTextProd,
    },
    bundle: true,
    target: 'es6',
    // eslint-disable-next-line @typescript-eslint/naming-convention
    loader: { '.frag': 'text', '.vert': 'text' },
    sourcemap: DEV ? 'inline' : false,
    absWorkingDir,
    outdir: 'lib',
    tsconfig: path.join(absWorkingDir, 'tsconfig.json'),
    logLevel: 'info',
    color: true,
    minify: !DEV,
    external: ['three'],
  };

  // == serve ========================================================================================
  async function serve() {
    const esmContext = await esbuild.context({
      ...buildOptions,
      ...entryPoints('esm'),
      absWorkingDir,
    });

    const extraContext =
      packageJson.name === '@pixiv/vrm-viewer'
        ? (await esbuild.context(vrmViewOptions(buildOptions))).watch()
        : Promise.resolve();

    await Promise.all([esmContext.watch(), extraContext]);
    await esmContext.serve({ servedir: '.', port: PORT });
  }

  async function build() {
    await esbuild.build({
      ...buildOptions,
      ...entryPoints('esm'),
    });

    await esbuild.build({
      ...buildOptions,
      ...entryPoints('cjs'),
      outExtension: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '.js': '.cjs',
      },
    });

    if (packageJson.name === '@pixiv/vrm-viewer') {
      await esbuild.build(vrmViewOptions(buildOptions));
    }
  }

  // == main =========================================================================================
  await (SERVE ? serve : build)();
}

/**
 * @param {import('esbuild').BuildOptions} baseBuildOptions
 * @returns {import('esbuild').BuildOptions}
 */
function vrmViewOptions(baseBuildOptions) {
  return {
    ...baseBuildOptions,
    format: 'esm',
    entryPoints: {
      [`vrm-viewer${minifySuffix}`]: 'src/index.ts',
    },
    external: [], // include three
  };
}
