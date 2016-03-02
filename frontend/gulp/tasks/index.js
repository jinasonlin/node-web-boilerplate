'use strict';

var config = require('../config').nodemon;

var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');
var nodemon = require('gulp-nodemon');

gulp.task('default', function (cb) {
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
  global.gulpOptions.prefix + 'media',
]));

gulp.task('nodemon', function (cb) {
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

gulp.task('developPlus', gulpSequence(global.gulpOptions.prefix + 'watchPlus', 'nodemon'));

gulp.task('develop', gulpSequence(global.gulpOptions.prefix + 'watch', 'nodemon'));
