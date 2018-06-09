const path = require("path")

module.exports = {
  entry: ["./popup/src/scripts/index.js"],

  output: {
    filename: "popup.js",
    path: path.join(__dirname, "../", "build"),
    publicPath: "/"
  },

  resolve: {
    extensions: ["", ".js", ".jsx", ".scss", ".json"],
    modulesDirectories: ["node_modules"]
  },

  module: {
    loaders: [
      {
        test: /\.(jsx|js)?$/,
        loader: "babel",
        exclude: /(node_modules)/,
        include: [
          path.join(__dirname, "src"),
          path.join(__dirname, "..", "common")
        ],
        query: {
          presets: ["env", "react"]
        }
      }
    ]
  }
}
