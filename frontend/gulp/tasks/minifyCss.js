'use strict';

var config    = require('../config').production;

var gulp      = require('gulp');
var minifyCSS = require('gulp-minify-css');
var size      = require('gulp-filesize');
var rename    = require('gulp-rename');

gulp.task(global.gulpOptions.prefix + 'minifyCss', ['css', 'sass'], function() {
  return gulp.src(config.css.src)
    .pipe(minifyCSS({ keepBreaks: false }))
    // .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(config.css.dest))
    .pipe(size());
});
