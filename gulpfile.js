const {src, dest, series, watch} = require('gulp');
const includer = require('gulp-file-include');
const sync = require('browser-sync').create()
const beautify = require('gulp-beautify').html;

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

const watcher = () => {
  sync.init({
    server: {
      baseDir: 'source'
    }
  });

  watch('source/html/**/*.html', indexHtml);
  watch('source/html/**/*.html', catalogHtml)
  watch('source/html/**/*.html', formHtml)
}

exports.indexHtml = indexHtml;
exports.catalogHtml = catalogHtml;
exports.formHtml = formHtml;
exports.watcher = watcher;
exports.default = series(indexHtml, catalogHtml, formHtml, watcher)
