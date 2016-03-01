'use strict';

var config = require('../config').script;

var gulp   = require('gulp');
var rename = require('gulp-rename');

gulp.task(global.gulpOptions.prefix + 'script', function () {
  return gulp.src(config.src)
    // .pipe(rename({extname: '.min.js'}))
    .pipe(gulp.dest(config.dest));
});