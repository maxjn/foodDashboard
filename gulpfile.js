// Initialize modules
const { src, dest, watch, series } = require("gulp");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const babel = require("gulp-babel");
const terser = require("gulp-terser");
const browsersync = require("browser-sync").create();
const tailwindcss = require("tailwindcss");
const postcssImport = require("postcss-import");

// Tailwind Task
function tailwindTask() {
  return src("src/css/style.css", { sourcemaps: true })
    .pipe(postcss([postcssImport(), tailwindcss(), autoprefixer(), cssnano()]))
    .pipe(dest("dist/css/", { sourcemaps: "." }));
}

// JavaScript Task
function jsTask() {
  return src("src/js/script.js", { sourcemaps: true })
    .pipe(babel({ presets: ["@babel/preset-env"] }))
    .pipe(terser())
    .pipe(dest("dist/js/", { sourcemaps: "." }));
}

// Browsersync
function browserSyncServe(cb) {
  browsersync.init({
    server: {
      baseDir: ".",
    },
    notify: {
      styles: {
        top: "auto",
        bottom: "0",
      },
    },
  });
  cb();
}
function browserSyncReload(cb) {
  browsersync.reload();
  cb();
}

// Watch Task
function watchTask() {
  watch("*.html", browserSyncReload);
  watch(
    ["src/css/**/*.css", "src/**/*.js"],
    series(tailwindTask, jsTask, browserSyncReload)
  );
}

// Default Gulp Task
exports.default = series(tailwindTask, jsTask, browserSyncServe, watchTask);

// Build Gulp Task
exports.build = series(tailwindTask, jsTask);
