
var config = require('../config');

var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');


gulp.task('default', function (cb) {
  console.log('check gulp task. such as "gulp [develop, developFS, developFSS, developFSSP]"');
  cb();
});

// developFullStackSyncPlus
gulp.task('developFSSP', ['browser-sync', global.gulpOptions.prefix + 'watchPlus'], function () {
  gulp.watch([config.css.dist], ['cp:css']);
  gulp.watch([config.script.dist], ['cp:script']);
  gulp.watch([config.tpl.dist,], ['cp:tpl']);
  gulp.watch([config.views.dist,], ['cp:views']);
});

// developFullStackSync
gulp.task('developFSS', ['browser-sync', global.gulpOptions.prefix + 'watch'], function () {
  gulp.watch([config.css.dist], ['cp:css']);
  gulp.watch([config.script.dist], ['cp:script']);
  gulp.watch([config.tpl.dist,], ['cp:tpl']);
  gulp.watch([config.views.dist,], ['cp:views']);
});

// developFullStack
gulp.task('developFS', ['nodemon', global.gulpOptions.prefix + 'watch'], function () {
  gulp.watch([config.css.dist], ['cp:css']);
  gulp.watch([config.script.dist], ['cp:script']);
  gulp.watch([config.tpl.dist,], ['cp:tpl']);
  gulp.watch([config.views.dist,], ['cp:views']);
});

gulp.task('develop', ['nodemon']);
