'use strict';

var config = require('../config').production;

var gulp   = require('gulp');
var size   = require('gulp-filesize');
var uglify = require('gulp-uglify');

gulp.task(global.gulpOptions.prefix + 'uglifyJs', [global.gulpOptions.prefix + 'browserify'], function() {
  return gulp.src(config.js.src)
    .pipe(uglify())
    .pipe(gulp.dest(config.js.dest))
    .pipe(size());
});
