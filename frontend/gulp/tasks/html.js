'use strict';

var config      = require('../config').html;

var gulp        = require('gulp');
var gulpif = require('gulp-if');
var fileInclude = require('gulp-file-include');

gulp.task(global.gulpOptions.prefix + 'html', function () {
  return gulp.src(config.src)
    .pipe(gulpif(global.gulpOptions.watch, watch(config.src, {
      name: global.gulpOptions.prefix + 'html',
      verbose: true
    })))
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(config.dest));
});