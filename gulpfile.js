var gulp = require("gulp"),
pug = require("pug"),
sass = require("gulp-sass"),
babel = require("gulp-babel"),
livereload = require("gulp-livereload"),
pretty = require("pretty"),
fs = require("fs");

const buildHTML = (body) => {
  let header = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  `
  
  let footer = `
  
  `
  
  fs.readFile("./src/assets.json", "utf-8", (err, data) => {
    data = JSON.parse(data);
    let css = data["css"];
    let js = data["js"];
    
    css.forEach(url => {
      header += `<link rel="stylesheet" href="${url}" />`
    });
    header += `
    <link rel="stylesheet" href="bundle/main.css">

    <title>Frontend Development</title>
    </head><body>

    `;
    
    js.forEach(url => {
      footer += `<script src="${url}"></script>`
    });
    footer += `
    <script src="bundle/main.js"></script>
    </body>
    </html>`;
    
    const html = pretty(header + body + footer)
    
    fs.writeFile("./index.html", html, err => {
      console.log(err);
    });
    
    
  });
  
}

gulp.task("pug", function () {
  let html = pug.renderFile('./src/main.pug')
  buildHTML(html)
  gulp.src('./src/main.pug').pipe(livereload())
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
  gulp.watch("./src/main.pug", ["pug"]);
  gulp.watch("./src/main.scss", ["sass"]);
  gulp.watch("./src/main.js", ["js"]);
});
