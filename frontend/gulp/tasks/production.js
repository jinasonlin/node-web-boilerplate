
var gulp         = require('gulp');
var gulpSequence = require('gulp-sequence');

gulp.task(global.gulpOptions.prefix + 'production', function (cb) {
  gulpSequence('clean', 'html', ['minifyCss', 'uglifyJs'], 'tpl')(cb);
});

