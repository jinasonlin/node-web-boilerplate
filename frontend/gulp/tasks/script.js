'use strict';

var config = require('../config').script;

var gulp   = require('gulp');
var gulpif = require('gulp-if');
var rename = require('gulp-rename');

gulp.task(global.gulpOptions.prefix + 'script', function () {
  return gulp.src(config.src)
    .pipe(gulpif(global.gulpOptions.watch, watch(config.src, {
      name: global.gulpOptions.prefix + 'script',
      verbose: true
    })))
    .pipe(gulpif(global.gulpOptions.rename, rename({extname: '.min.js'})))
    .pipe(gulp.dest(config.dest));
});