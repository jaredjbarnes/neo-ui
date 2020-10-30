var path = require("path");

module.exports = {
  // Change to your "entry-point".
  entry: {
    main: "./src/index",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js",
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        // Include md, ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: ["babel-loader"],
      },
    ],
  },
};
