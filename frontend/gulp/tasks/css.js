'use strict';

var config = require('../config').css;

var gulp   = require('gulp');
var gulpif = require('gulp-if');

gulp.task(global.gulpOptions.prefix + 'css', function () {
  return gulp.src(config.src)
    .pipe(gulpif(global.gulpOptions.watch, watch(config.src, {
      name: global.gulpOptions.prefix + 'css',
      verbose: true
    })))
    .pipe(gulp.dest(config.dest));
});