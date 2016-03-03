'use strict';

var config = require('../config').sass;

var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');

gulp.task(global.gulpOptions.prefix + 'sass', function () {
  var src = gulp.src(config.src);
  if (global.gulpOptions.watch) {
    src = src.pipe(watch(config.src, {
      name: global.gulpOptions.prefix + 'sass',
      verbose: true
    }));
  }
  return src
    .pipe(sass())
    .pipe(gulp.dest(config.dest));
});
