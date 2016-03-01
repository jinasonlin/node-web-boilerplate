'use strict';

var config = require('../config').sass;

var gulp   = require('gulp'); 
var sass   = require('gulp-sass');

gulp.task(global.gulpOptions.prefix + 'sass', function () {
  return gulp.src(config.src)
    .pipe(sass())
    .pipe(gulp.dest(config.dest));
});