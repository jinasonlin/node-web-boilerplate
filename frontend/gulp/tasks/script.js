'use strict';

var config = require('../config').script;

var gulp = require('gulp');
var rename = require('gulp-rename');
var watch = require('gulp-watch');

gulp.task(global.gulpOptions.prefix + 'script', function () {
  var src = gulp.src(config.src);
  if (global.gulpOptions.watch) {
    src = src.pipe(watch(config.src, {
      name: global.gulpOptions.prefix + 'script',
      verbose: true
    }));
  }
  if (global.gulpOptions.rename) {
    src = src.pipe(rename({ extname: '.min.js' }));
  }
  return src.pipe(gulp.dest(config.dest));
});
