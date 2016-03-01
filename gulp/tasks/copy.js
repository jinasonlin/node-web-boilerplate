'use strict';

var config      = require('../config');

var gulp        = require('gulp');
var gulpSequence        = require('gulp-sequence');


gulp.task('cp:views', function () {
  // return gulp
  //   .src(config.views.dist)
  //   .pipe(gulp.dest(config.views.public));
  if (global.gulpOptions.bs) {
    return gulp
      .src(config.views.dist)
      .pipe(gulp.dest(config.views.public))
      .pipe(global.gulpOptions.bs.reload({ stream: true }));
  } else {
    return gulp
      .src(config.views.dist)
      .pipe(gulp.dest(config.views.public));
  }
});

gulp.task('cp:css', function () {
  if (global.gulpOptions.bs) {
    return gulp
      .src(config.css.dist)
      .pipe(gulp.dest(config.css.public))
      .pipe(global.gulpOptions.bs.reload({ stream: true }));
  } else {
    return gulp
      .src(config.css.dist)
      .pipe(gulp.dest(config.css.public));
  }
});

gulp.task('cp:script', function () {
  // return gulp
  //   .src(config.script.dist)
  //   .pipe(gulp.dest(config.script.public));
  if (global.gulpOptions.bs) {
    return gulp
      .src(config.script.dist)
      .pipe(gulp.dest(config.script.public))
      .pipe(global.gulpOptions.bs.reload({ stream: true }));
  } else {
    return gulp
      .src(config.script.dist)
      .pipe(gulp.dest(config.script.public));
  }
});

gulp.task('cp:tpl', function () {
  // return gulp
  //   .src(config.tpl.dist)
  //   .pipe(gulp.dest(config.tpl.public));
  if (global.gulpOptions.bs) {
    return gulp
      .src(config.tpl.dist)
      .pipe(gulp.dest(config.tpl.public))
      .pipe(global.gulpOptions.bs.reload({ stream: true }));
  } else {
    return gulp
      .src(config.tpl.dist)
      .pipe(gulp.dest(config.tpl.public));
  }
});

gulp.task('cp:images', function () {
  return gulp
    .src(config.images.dist)
    .pipe(gulp.dest(config.images.public));
});

gulp.task('cp:media', function () {
  return gulp
    .src(config.media.dist)
    .pipe(gulp.dest(config.media.public));
});

gulp.task('cp:lib', function () {
  return gulp
    .src(config.lib.dist)
    .pipe(gulp.dest(config.lib.public));
});


gulp.task('cp', gulpSequence(['cp:views', 'cp:css', 'cp:script', 'cp:tpl', 'cp:images', 'cp:media', 'cp:lib']));
