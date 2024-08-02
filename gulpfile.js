const imagemin = require("gulp-imagemin");
const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const postcss = require("gulp-postcss");
const csso = require("postcss-csso");
const autoprefixer = require("autoprefixer");
const rename = require("gulp-rename");
const sync = require("browser-sync").create();
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const htmlmin = require("gulp-htmlmin");
const terser = require("gulp-terser");
const del = require("del");

// Styles

const styles = () =>
  gulp
    .src("docs/css/style.css")
    .pipe(plumber())
    .pipe(postcss([autoprefixer(), csso()]))
    .pipe(rename("style.min.css"))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("build/css"))
    .pipe(sync.stream());

exports.styles = styles;

// HTML

const html = () =>
  gulp
    .src("docs/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));

exports.html = html;

// Scripts

const scripts = () =>
  gulp
    .src("docs/js/*.js")
    .pipe(terser())
    .pipe(gulp.dest("build/js"))
    .pipe(sync.stream());

exports.scripts = scripts;

// WebP

const createWebp = () =>
  gulp
    .src("docs/img/**/*.{jpg,png}")
    .pipe(webp({ quality: 90 }))
    .pipe(gulp.dest("build/img"));

exports.createWebp = createWebp;

// Images
const images = () => {
  return gulp
    .src("docs/img/**/*.{png,jpg,svg}")
    .pipe(imagemin())
    .pipe(gulp.dest("build/img"));
};

exports.images = images;

// Sprite

const sprite = () =>
  gulp
    .src("docs/img/icon/*.svg")
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));

exports.sprite = sprite;

// Copy

const copy = (done) => {
  gulp
    .src(
      [
        "docs/fonts/*.{woff2,woff}",
        "docs/*.ico",
        "docs/leaflet/**/*.*",
        "docs/nouislider/**/*.*",
        "docs/pristine/**/*.*",
        "docs/img/**/*.svg",
        "!docs/img/icons/*.svg",
        "docs/manifest.webmanifest",
      ],
      {
        base: "docs",
      }
    )
    .pipe(gulp.dest("build"));
  done();
};

// Watcher

const watcher = () => {
  gulp.watch(["docs/css/**/*.css"], gulp.series(styles));
  gulp.watch(["docs/js/**/*.js"], gulp.series(scripts));
  gulp.watch(["docs/*.html"], html).on("change", sync.reload);
};

exports.watcher = watcher;

// Clean

const clean = () => del("build");

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

exports.server = server;

// Build

const build = gulp.series(
  clean,
  copy,
  images,
  gulp.parallel(styles, html, scripts, sprite, createWebp)
);

exports.build = build;

exports.default = gulp.series(
  clean,
  copy,
  images,
  gulp.parallel(styles, html, scripts, sprite, createWebp),
  gulp.series(server, watcher)
);
