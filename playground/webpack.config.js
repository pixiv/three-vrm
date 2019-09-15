/* eslint-env node */

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = (env, argv) => {
  const isProd = argv.mode === 'production';
  return {
    mode: argv.mode || 'development',
    entry: path.resolve(__dirname, 'src', 'index.tsx'),
    output: {
      filename: isProd ? '[name]-[hash].js' : '[name].js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          use: 'ts-loader',
        },
        {
          test: /\.css$/,
          loaders: ['style-loader', 'css-loader'],
        },
      ],
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      modules: ['node_modules'],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: 'index.ejs',
        filename: 'index.html',
        inject: true,
      }),
    ],
    devServer: {
      host: '0.0.0.0',
      port: 4000,
      contentBase: path.resolve(__dirname, './'),
      publicPath: '/',
      openPage: '/index.html',
      watchContentBase: true,
      inline: true,
      historyApiFallback: true,
      noInfo: true,
    },
  };
};
