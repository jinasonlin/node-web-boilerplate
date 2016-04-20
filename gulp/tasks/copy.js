var config = require('../config');

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var watch = require('gulp-watch');


gulp.task('cp:views', function () {
  var src = gulp.src(config.views.dist);
  if (global.gulpOptions.watch) {
    src = src.pipe(watch(config.views.dist, { name: 'cp:views', verbose: true }));
  }
  src = src.pipe(gulp.dest(config.views.public));
  if (global.gulpOptions.bs) {
    // src = src.pipe(global.gulpOptions.bsReload({ stream: true }));
    src = src.pipe(global.gulpOptions.bs.reload({ stream: true }));
  }

  return src;
});

gulp.task('cp:css', function () {
  var src = gulp.src(config.css.dist);
  if (global.gulpOptions.watch) {
    src = src.pipe(watch(config.css.dist, { name: 'cp:css', verbose: true }));
  }
  src = src.pipe(gulp.dest(config.css.public));
  if (global.gulpOptions.bs) {
    // src = src.pipe(global.gulpOptions.bsReload({ stream: true }));
    src = src.pipe(global.gulpOptions.bs.reload({ stream: true }));
  }

  return src;
});

gulp.task('cp:script', function () {
  var src = gulp.src(config.script.dist);
  if (global.gulpOptions.watch) {
    src = src.pipe(watch(config.script.dist, { name: 'cp:script', verbose: true }));
  }
  src = src.pipe(gulp.dest(config.script.public));
  if (global.gulpOptions.bs) {
    // src = src.pipe(global.gulpOptions.bsReload({ stream: true }));
    src = src.pipe(global.gulpOptions.bs.reload({ stream: true }));
  }

  return src;
});

gulp.task('cp:tpl', function () {
  var src = gulp.src(config.tpl.dist);
  if (global.gulpOptions.watch) {
    src = src.pipe(watch(config.tpl.dist, { name: 'cp:tpl', verbose: true }));
  }
  src = src.pipe(gulp.dest(config.tpl.public));
  if (global.gulpOptions.bs) {
    // src = src.pipe(global.gulpOptions.bsReload({ stream: true }));
    src = src.pipe(global.gulpOptions.bs.reload({ stream: true }));
  }

  return src;
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


gulp.task('cp', gulpSequence([
  'cp:views',
  'cp:css',
  'cp:script',
  'cp:tpl',
  'cp:images',
  'cp:media',
  'cp:lib'
]));
