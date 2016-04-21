
var config = require('../config').nodemon;

var gulp = require('gulp');
var gulpSequence = require('gulp-sequence');
var nodemon = require('gulp-nodemon');
var browserSync = require('browser-sync').create();

gulp.task(global.gulpOptions.prefix + 'default', function (cb) {
  console.log('check gulp task. such as "gulp develop"');
  cb();
});

gulp.task(global.gulpOptions.prefix + 'build', gulpSequence([
  global.gulpOptions.prefix + 'html',
  global.gulpOptions.prefix + 'css',
  global.gulpOptions.prefix + 'sass',
  global.gulpOptions.prefix + 'script',
  global.gulpOptions.prefix + 'browserify',
  global.gulpOptions.prefix + 'tpl',
  global.gulpOptions.prefix + 'lib',
  global.gulpOptions.prefix + 'images',
  global.gulpOptions.prefix + 'media'
]));

gulp.task(global.gulpOptions.prefix + 'nodemon', function (cb) {
  var started = false;
  nodemon(config)
    .on('start', function () {
      if (!started) {
        cb();
        started = true;
      }
    })
    .on('restart', function () {
      console.log('restarted!');
    });
});

gulp.task(global.gulpOptions.prefix + 'browser-sync', function () {
  global.gulpOptions.watch = true;
  global.gulpOptions.bsFront = browserSync;
  global.gulpOptions.bsFrontRload = browserSync.reload;
  browserSync.init({
    open: false,
    proxy: 'http://localhost:8082'
  });
});

gulp.task(global.gulpOptions.prefix + 'develop',
  gulpSequence(global.gulpOptions.prefix + 'watch', global.gulpOptions.prefix + 'nodemon'));

gulp.task(global.gulpOptions.prefix + 'developP',
  gulpSequence(global.gulpOptions.prefix + 'watchPlus', global.gulpOptions.prefix + 'nodemon'));

gulp.task(global.gulpOptions.prefix + 'developS',
  gulpSequence(
    global.gulpOptions.prefix + 'watch',
    global.gulpOptions.prefix + 'nodemon',
    global.gulpOptions.prefix + 'browser-sync'));
