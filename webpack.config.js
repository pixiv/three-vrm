const path = require("path");
const webpackMerge = require("webpack-merge");

const base = (mode) => {
  return {
    mode: mode,
    entry: path.resolve(__dirname, "src", "index.ts"),
    output: {
      path: path.resolve(__dirname, "lib"),
      filename: `index.module.js`,
      library: "vrm",
      libraryTarget: "umd",
      globalObject: "this"
    },
    externals: {
      three: "three"
    },
    module: {
      rules: [
        {
          test: /\.ts?$/,
          enforce: "pre",
          use: "tslint-loader"
        },
        {
          test: /\.ts?$/,
          exclude: /node_modules/,
          use: "ts-loader"
        },
        {
          test: /\.(glsl|frag|vert)$/,
          use: "raw-loader"
        }
      ]
    },
    resolve: {
      extensions: [".js", ".ts"],
      modules: ["node_modules"]
    },
  };
};


module.exports = (env, argv) => {

  const isProd = argv.mode === "production";

  return [
    base(argv.mode),
    webpackMerge(base(argv.mode), {
      entry: path.resolve(__dirname, "src", "assign.ts"),
      output: {
        filename: isProd ? "index.min.js" : `index.js`,
        library: "__three_vrm__",
        libraryTarget: "var"
      },
      externals: {
        three: "THREE",
      },
    })
  ];
}
