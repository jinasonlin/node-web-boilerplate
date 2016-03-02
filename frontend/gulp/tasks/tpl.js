'use strict';

var config = require('../config').tpl;

var gulp   = require('gulp');

gulp.task(global.gulpOptions.prefix + 'tpl', function () {
  return gulp.src(config.src)
    .pipe(gulpif(global.gulpOptions.watch, watch(config.src, {
      name: global.gulpOptions.prefix + 'tpl',
      verbose: true
    })))
    .pipe(gulp.dest(config.dest));
});