// const gulp = require("gulp");
const {src, dest, series, watch} = require('gulp');
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create();
const includer = require('gulp-file-include');
const beautify = require('gulp-beautify').html;
const concat = require('gulp-concat');


// html
const htmlProto = (fileName) => {
  return src(`source/html/${fileName}.html`)
    .pipe(includer({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(beautify({
      end_with_newline: true,
      indent_size: 2
    }))
    .pipe(dest('source'))
    .pipe(sync.stream())
}

const indexHtml = () => htmlProto('index');
const catalogHtml = () => htmlProto('catalog');
const formHtml = () => htmlProto('form');

// js

const scriptList = ['source/js/example.js', 'source/js/page-header.js']
const scripts = () => {
  return src(scriptList)
    .pipe(concat('script.js'))
    .pipe(dest('source/js'))
    .pipe(sync.stream())
}

// Styles

const styles = () => {
  return src("source/sass/style.scss")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(sass())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(dest("source/css"))
    .pipe(sync.stream());
}

exports.styles = styles;

// Server

const server = (done) => {
  sync.init({
    server: {
      baseDir: 'source'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher

const watcher = () => {
  // gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  // gulp.watch("source/*.html").on("change", sync.reload);
  watch('source/html/**/*.html', indexHtml);
  watch('source/html/**/*.html', catalogHtml);
  watch('source/html/**/*.html', formHtml);
  watch(['source/js/**/*.js', '!source/js/script.js'], scripts)
  watch("source/sass/**/*.scss", styles);
}


exports.default = series(indexHtml, catalogHtml, scripts, formHtml, styles, server, watcher);
