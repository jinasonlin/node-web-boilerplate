
var config = require('../config').sass;

var gulp = require('gulp');
var watch = require('gulp-watch');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');
var rename = require('gulp-rename');

gulp.task(global.gulpOptions.prefix + 'sass', function () {
  var src = gulp.src(config.src);
  if (global.gulpOptions.watch) {
    src = src.pipe(watch(config.src, {
      name: global.gulpOptions.prefix + 'sass',
      verbose: true
    }));
  }
  src = src.pipe(sass());
  if (!global.gulpOptions.development) {
    src = src.pipe(minifyCSS({ keepBreaks: false }));
  }
  if (global.gulpOptions.rename) {
    src = src.pipe(rename({ extname: '.min.css' }));
  }
  src = src.pipe(gulp.dest(config.dest));
  if (global.gulpOptions.bsFront) {
    // src = src.pipe(global.gulpOptions.bsFrontRload({ stream: true }));
    src = src.pipe(global.gulpOptions.bsFront.reload({ stream: true }));
  }
  return src;
});
