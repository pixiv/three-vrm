// @ts-check
import esbuild from 'esbuild';
import path from 'node:path';
import fs from 'node:fs/promises';

// == envs =========================================================================================
const NODE_ENV = process.env.NODE_ENV;
const DEV = NODE_ENV === 'development';
const SERVE = process.env.SERVE === '1';
const PORT = parseInt(process.env.PORT || '10001', 10);

// == build =========================================================================================

const workDir = process.argv[2] ? path.join(process.cwd(), process.argv[2]) : process.cwd();
await buildPackage(workDir);

// == implement =====================================================================================

/**
 *
 * @param {string} absWorkingDir
 */
async function buildPackage(absWorkingDir) {
  /**
   * @type {{ name: string, version: string, description: string, module: string }}
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
    /**
     * @param {string} base
     */
    const addSuffix = (base) => {
      let outFilename = base + (format === 'esm' ? '.module' : '');
      return outFilename + (DEV ? '' : '.min');
    };
    let outFilename = addSuffix(filename);

    const needsNodesBuild = ['@pixiv/three-vrm', '@pixiv/three-vrm-materials-mtoon'].includes(packageJson.name);
    const extraEntryPoints = needsNodesBuild
      ? { [addSuffix('nodes/index')]: 'src/nodes/index.ts' }
      : {};

    return {
      entryPoints: {
        [outFilename]: 'src/index.ts',
        ...extraEntryPoints,
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
      outdir: 'lib',
      absWorkingDir,
    });

    await esmContext.watch();
    await esmContext.serve({ servedir: '.', port: PORT });
  }

  async function build() {
    await esbuild.build({
      ...buildOptions,
      ...entryPoints('esm'),
      outdir: 'lib',
    });

    await esbuild.build({
      ...buildOptions,
      ...entryPoints('cjs'),
      outdir: 'lib',
      outExtension: {
        // eslint-disable-next-line @typescript-eslint/naming-convention
        '.js': '.cjs',
      },
    });
  }

  // == main =========================================================================================
  await (SERVE ? serve : build)();
}
