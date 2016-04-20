var config = require('../config').nodemon;

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

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
