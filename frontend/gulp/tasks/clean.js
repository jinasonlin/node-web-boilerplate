'use strict';

var config = require('../config').clean;

var gulp   = require('gulp');
var del = require('del');

gulp.task(global.gulpOptions.prefix + 'clean', function() {
  return del(config.files);
});
