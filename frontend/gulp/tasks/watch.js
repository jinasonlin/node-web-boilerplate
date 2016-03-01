
var config = require('../config');

var gulp   = require('gulp');

gulp.task(global.gulpOptions.prefix + 'watch', [global.gulpOptions.prefix + 'watchify'], function (cb) {
  gulp.watch(config.html.src, [global.gulpOptions.prefix + 'html']);
  gulp.watch(config.css.src, [global.gulpOptions.prefix + 'css']);
  gulp.watch(config.sass.src, [global.gulpOptions.prefix + 'sass']);
  gulp.watch(config.script.src, [global.gulpOptions.prefix + 'script']);
  gulp.watch(config.tpl.src, [global.gulpOptions.prefix + 'tpl']);
  cb();
});
