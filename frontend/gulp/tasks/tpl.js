'use strict';

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
  return src.pipe(gulp.dest(config.dest));
});
