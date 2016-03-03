'use strict';

var config = require('../config').css;

var gulp = require('gulp');
var watch = require('gulp-watch');

gulp.task(global.gulpOptions.prefix + 'css', function () {
  var src = gulp.src(config.src);
  if (global.gulpOptions.watch) {
    src = src.pipe(watch(config.src, {
      name: global.gulpOptions.prefix + 'css',
      verbose: true
    }));
  }
  return src.pipe(gulp.dest(config.dest));
});
