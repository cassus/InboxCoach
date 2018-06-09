import gulp from "gulp"
import loadPlugins from "gulp-load-plugins"
import webpack from "webpack"
import rimraf from "rimraf"
import bump from "gulp-bump"

const plugins = loadPlugins()

import popupWebpackConfig from "./popup/webpack.config"
import eventWebpackConfig from "./event/webpack.config"

gulp.task("popup-js", ["clean"], cb => {
  webpack(popupWebpackConfig, (err, stats) => {
    if (err) throw new plugins.util.PluginError("webpack", err)

    plugins.util.log("[webpack]", stats.toString())

    cb()
  })
})

gulp.task("event-js", ["clean"], cb => {
  webpack(eventWebpackConfig, (err, stats) => {
    if (err) throw new plugins.util.PluginError("webpack", err)

    plugins.util.log("[webpack]", stats.toString())

    cb()
  })
})

gulp.task("popup-html", ["clean"], () => {
  return gulp
    .src("popup/src/index.html")
    .pipe(plugins.rename("popup.html"))
    .pipe(gulp.dest("./build"))
})

gulp.task("copy", ["clean"], () => {
  return gulp
    .src(["manifest.json", "audio/*", "icons/out/*"])
    .pipe(gulp.dest("./build"))
})

gulp.task("clean", cb => {
  rimraf("./build", cb)
})

gulp.task("bump", function() {
  gulp
    .src("./manifest.json")
    .pipe(bump({ type: "minor" }))
    .pipe(gulp.dest("./"))
})

gulp.task("build", ["copy", "popup-js", "popup-html", "event-js"])

gulp.task("watch", ["default"], () => {
  gulp.watch(["popup/**/*", "common/**"], ["build"])
  gulp.watch(["event/**/*", "common/**"], ["build"])
})

gulp.task("default", ["build"])
