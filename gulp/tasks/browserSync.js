'use strict';

var config      = require('../config');

var gulp        = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('browser-sync', ['nodemon'], function() {
  global.gulpOptions.bs = browserSync;
  browserSync.init({
    open: false,
    proxy: 'http://localhost:8081'
  });
});

gulp.task('bs-reload', function() {
  browserSync.reload();
});
