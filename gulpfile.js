var gulp = require("gulp"),
    sass = require("gulp-sass"),
    babel = require("gulp-babel"),
    livereload = require("gulp-livereload");

gulp.task("html", function() {
  gulp.src("*.html").pipe(livereload());
});

gulp.task("sass", function() {
  gulp
  .src("./src/main.scss")
  .pipe(sass().on("error", sass.logError))
  .pipe(gulp.dest("./bundle")).pipe(livereload())
});

gulp.task("js", () =>
gulp
.src("src/main.js")
.pipe(
  babel({
    presets: ["env"]
  })
)
.pipe(gulp.dest("bundle")).pipe(livereload())
);

gulp.task("watch", function() {
  livereload.listen();
  gulp.watch("*.html", ["html"]);
  gulp.watch("./src/main.scss", ["sass"]);
  gulp.watch("./src/main.js", ["js"]);
});
