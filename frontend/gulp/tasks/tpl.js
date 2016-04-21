
var config = require('../config').tpl;

var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task(global.gulpOptions.prefix + 'tpl', function () {
  var src = gulp.src(config.src);
  if (global.gulpOptions.watch) {
    src = src.pipe(watch(config.src, {
      name: global.gulpOptions.prefix + 'tpl',
      verbose: true
    }));
  }
  src = src.pipe(gulp.dest(config.dest));
  if (global.gulpOptions.bsFront) {
    // src = src.pipe(global.gulpOptions.bsFrontRload({ stream: true }));
    src = src.pipe(global.gulpOptions.bsFront.reload({ stream: true }));
  }
  return src;
});
