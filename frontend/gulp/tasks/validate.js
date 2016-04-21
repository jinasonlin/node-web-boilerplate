var gulp = require('gulp');
var eslint = require('gulp-eslint');
var gulpSequence = require('gulp-sequence');

gulp.task(global.gulpOptions.prefix + 'lint.js', function () {
  return gulp.src('src/js/**/*.js')
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});

gulp.task(global.gulpOptions.prefix + 'lint.react', function () {
  return gulp.src('src/react/**/*.jsx')
    .pipe(eslint('./.eslintrc.react.json'))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
});
