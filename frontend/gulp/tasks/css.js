'use strict';

var config = require('../config').css;

var gulp   = require('gulp');

gulp.task(global.gulpOptions.prefix + 'css', function () {
  return gulp.src(config.src)
    .pipe(gulp.dest(config.dest));
});