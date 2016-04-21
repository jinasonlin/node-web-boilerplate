
var config = require('../config').script;

var gulp = require('gulp');
var watch = require('gulp-watch');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');

gulp.task(global.gulpOptions.prefix + 'script', function () {
  var src = gulp.src(config.src);
  if (global.gulpOptions.watch) {
    src = src.pipe(watch(config.src, {
      name: global.gulpOptions.prefix + 'script',
      verbose: true
    }));
  }
  if (!global.gulpOptions.development) {
    // src = src.pipe(uglify());
    src = src.pipe(sourcemaps.init())
      .pipe(uglify())
      .pipe(sourcemaps.write('./'));
  }
  if (global.gulpOptions.rename) {
    src = src.pipe(rename({ extname: '.min.js' }));
  }
  src = src.pipe(gulp.dest(config.dest));
  if (global.gulpOptions.bsFront) {
    // src = src.pipe(global.gulpOptions.bsFrontRload({ stream: true }));
    src = src.pipe(global.gulpOptions.bsFront.reload({ stream: true }));
  }
  return src;
});
