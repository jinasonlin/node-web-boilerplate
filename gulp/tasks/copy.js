'use strict';

var config      = require('../config');

var gulp        = require('gulp');
var gulpif = require('gulp-if');
var gulpSequence        = require('gulp-sequence');
var watch = require('gulp-watch');


gulp.task('cp:views', function () {
  return gulp.src(config.views.dist)
    .pipe(gulpif(global.gulpOptions.watch, watch(config.views.dist, {name: 'cp:views', verbose: true})))
    .pipe(gulp.dest(config.views.public))
    .pipe(gulpif(global.gulpOptions.bs, global.gulpOptions.bs.reload({ stream: true })));
});

gulp.task('cp:css', function () {
  return gulp.src(config.css.dist)
    .pipe(gulpif(global.gulpOptions.watch, watch(config.css.dist, {name: 'cp:css', verbose: true})))
    .pipe(gulp.dest(config.css.public))
    .pipe(gulpif(global.gulpOptions.bs, global.gulpOptions.bs.reload({ stream: true })));
});

gulp.task('cp:script', function () {
  return gulp.src(config.script.dist)
    .pipe(gulpif(global.gulpOptions.watch, watch(config.script.dist, {name: 'cp:script', verbose: true})))
    .pipe(gulp.dest(config.script.public))
    .pipe(gulpif(global.gulpOptions.bs, global.gulpOptions.bs.reload({ stream: true })));
});

gulp.task('cp:tpl', function () {
  return gulp.src(config.tpl.dist)
    .pipe(gulpif(global.gulpOptions.watch, watch(config.tpl.dist, {name: 'cp:tpl', verbose: true})))
    .pipe(gulp.dest(config.tpl.public))
    .pipe(gulpif(global.gulpOptions.bs, global.gulpOptions.bs.reload({ stream: true })));
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
