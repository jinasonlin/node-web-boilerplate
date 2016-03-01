
var config = require('../config');

var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');


gulp.task('default', function (cb) {
  console.log('check gulp task. such as "gulp develop"');
  cb();
});

gulp.task('developPlus', ['browser-sync', global.gulpOptions.prefix + 'watch'], function () {
  gulp.watch([config.css.dist], ['cp:css']);
  gulp.watch([config.script.dist], ['cp:script']);
  gulp.watch([config.tpl.dist,], ['cp:tpl']);
  gulp.watch([config.views.dist,], ['cp:views']);
});

gulp.task('develop', ['nodemon']);
