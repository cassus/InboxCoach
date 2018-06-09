const path = require("path")

module.exports = {
  entry: ["./event/src/index.js"],

  output: {
    filename: "event.js",
    path: path.join(__dirname, "../", "build")
  },

  resolve: {
    extensions: ["", ".js", ".json"],
    modulesDirectories: ["node_modules"]
  },

  module: {
    loaders: [
      {
        test: /\.(js)?$/,
        loader: "babel",
        exclude: /(node_modules)/,
        include: [
          path.join(__dirname, "src"),
          path.join(__dirname, "..", "common")
        ],
        query: {
          presets: ["env", "react"],
          plugins: ["transform-object-rest-spread"]
        }
      }
    ]
  }
}
