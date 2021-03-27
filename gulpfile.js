const {src, dest, series, watch} = require('gulp');
const includer = require('gulp-file-include');
const sync = require('browser-sync').create()

const htmlProto = (fileName) => {
  return src(`source/html/${fileName}.html`)
    .pipe(includer({
      prefix: '@@',
      basepath: '@file'
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
