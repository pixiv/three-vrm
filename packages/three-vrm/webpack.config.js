/* eslint-disable */

const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const { version } = require('./package.json');

const base = (mode) => {
  const isProd = mode === 'production';

  const banner = isProd
    ? '(c) 2019 pixiv Inc. - https://github.com/pixiv/three-vrm/blob/master/LICENSE'
    : `@pixiv/three-vrm v${version}
Use VRM on Three.js

Copyright (c) 2019 pixiv Inc.
@pixiv/three-vrm is distributed under the MIT License
https://github.com/pixiv/three-vrm/blob/master/LICENSE`;

  return {
    mode,
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
      path: path.resolve(__dirname, 'lib'),
      filename: `three-vrm.module.js`,
      library: 'vrm',
      libraryTarget: 'umd',
      globalObject: 'this',
    },
    externals: {
      three: 'three',
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
          },
        },
        {
          test: /\.(frag|vert)$/,
          use: 'raw-loader',
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.ts'],
      modules: ['node_modules'],
    },
    devServer: {
      port: 3000,
      contentBase: path.resolve(__dirname, './'),
      publicPath: '/lib/',
      openPage: 'examples/index.html',
      watchContentBase: true,
      inline: true,
    },
    plugins: [
      new webpack.BannerPlugin(banner),
      new webpack.DefinePlugin({ 'process.env': { NODE_ENV: mode } }),
      ...(isProd ? [] : [new ForkTsCheckerWebpackPlugin({ checkSyntacticErrors: true })]),
    ],
    devtool: isProd ? false : 'inline-source-map',
  };
};

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';

  return [
    base(argv.mode),
    merge(base(argv.mode), {
      entry: path.resolve(__dirname, 'src', 'assign.ts'),
      output: {
        filename: isProd ? 'three-vrm.min.js' : `three-vrm.js`,
        library: '__three_vrm__',
        libraryTarget: 'var',
      },
      externals: {
        three: 'THREE',
      },
    }),
  ];
};
