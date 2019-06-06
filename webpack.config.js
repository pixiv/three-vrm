const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const base = {
  mode: 'production',
  entry: path.resolve(__dirname, 'src', 'index.ts'),
  output: {
    path: path.resolve(__dirname, 'lib'),
    filename: 'index.js',
    library: 'vrm',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  externals: {
    'three': {
      commonjs: 'three',
      commonjs2: 'three',
      amd: 'three',
      root: 'THREE'
    }
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        enforce: 'pre',
        use: 'tslint-loader',
      },
      {
        test: /\.ts?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
      {
        test: /\.(glsl|frag|vert)$/,
        use: 'raw-loader'
      }
    ],
  },
  resolve: {
    extensions: ['.js', '.ts'],
    modules: ['node_modules'],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: 'src/three' }
    ])
  ]
};

module.exports = [
  base,


];
