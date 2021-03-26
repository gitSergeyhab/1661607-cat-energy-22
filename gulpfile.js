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
}

const indexHtml = () => htmlProto('index');

const watcher = () => {
  sync.init({
    server: {
      baseDir: 'source'
    }
  });

  watch('source/html/**/*.html', indexHtml)
}

exports.indexHtml = indexHtml;
exports.default = series(indexHtml, watcher)
