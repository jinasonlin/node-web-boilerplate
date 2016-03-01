'use strict';

var config = require('../config').tpl;

var gulp   = require('gulp');

gulp.task(global.gulpOptions.prefix + 'tpl', function () {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});