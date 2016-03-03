'use strict';

var config = require('../config').html;

var gulp = require('gulp');
var fileInclude = require('gulp-file-include');
var watch = require('gulp-watch');

gulp.task(global.gulpOptions.prefix + 'html', function () {
  var src = gulp.src(config.src);
  if (global.gulpOptions.watch) {
    src = src.pipe(watch(config.src, {
      name: global.gulpOptions.prefix + 'html',
      verbose: true
    }));
  }
  return src
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(config.dest));
});
