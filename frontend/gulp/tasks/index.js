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



gulp.task('develop', [global.gulpOptions.prefix + 'watch'], function (cb) {
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

