'use strict';

var config = require('../config').sass;

var gulp   = require('gulp');
var gulpif = require('gulp-if');
var sass   = require('gulp-sass');
var watch = require('gulp-watch');

gulp.task(global.gulpOptions.prefix + 'sass', function () {
  return gulp.src(config.src)
    .pipe(gulpif(global.gulpOptions.watch, watch(config.src, {
      name: global.gulpOptions.prefix + 'sass',
      verbose: true
    })))
    .pipe(sass())
    .pipe(gulp.dest(config.dest));

});