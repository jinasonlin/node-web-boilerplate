'use strict';

var config = require('../config').browserify;
var bundleLogger = require('../util/bundleLogger');
var handleErrors = require('../util/handleErrors');

var gulp = require('gulp');
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var literalify = require('literalify');
var sourcemaps = require('gulp-sourcemaps');
var uglify = require('gulp-uglify');

var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');

var _ = require('lodash');

var browserifyTask = function (callback, devMode) {

  var bundleQueue = config.bundleConfigs.length;

  if (!bundleQueue) {
    return callback();
  }

  var browserifyThis = function (bundleConfig) {

    if (devMode) {
      bundleConfig = _.assign({debug: true, fullPaths: true}, bundleConfig, watchify.args);
      bundleConfig = _.omit(bundleConfig, ['external', 'require']);
    }

    var b = browserify(bundleConfig).transform(babelify);

    if (bundleConfig.literal) {
      b.transform(literalify.configure(bundleConfig.literal))
    }

    var bundle = function () {
      bundleLogger.start(bundleConfig.outputName);

      b = b
        .bundle()
        .on('error', handleErrors)
        .pipe(source(bundleConfig.outputName));

      if (!global.gulpOptions.development) {
        b = b
          .pipe(buffer())
          .pipe(sourcemaps.init({ loadMaps: true }))
          .pipe(uglify())
          .pipe(sourcemaps.write('./'));
      }

      return b
        .pipe(gulp.dest(bundleConfig.dest))
        .on('end', reportFinished);

      // // TODO rename & uglifyjs
      // return b
      //   .bundle()
      //   .on('error', handleErrors)
      //   .pipe(source(bundleConfig.outputName))
      //   .pipe(buffer())
      //   .pipe(sourcemaps.init({ loadMaps: true }))
      //   .pipe(uglify())
      //   .pipe(sourcemaps.write('./'))
      //   .pipe(gulp.dest(bundleConfig.dest))
      //   .on('end', reportFinished);
    };

    if (devMode) {
      b = watchify(b);
      b.on('update', bundle);
      bundleLogger.watch(bundleConfig.outputName);
    } else {
      if (bundleConfig.require) b.require(bundleConfig.require);
      if (bundleConfig.external) b.external(bundleConfig.external);
    }

    var reportFinished = function () {
      bundleLogger.end(bundleConfig.outputName);

      if (bundleQueue) {
        bundleQueue--;
        if (bundleQueue === 0) {
          callback();
        }
      }
    };

    return bundle();
  };

  config.bundleConfigs.forEach(browserifyThis);
};

gulp.task(global.gulpOptions.prefix + 'browserify', browserifyTask);

module.exports = browserifyTask;

