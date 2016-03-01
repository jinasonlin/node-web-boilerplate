'use strict';

var dest = global.gulpOptions.frontPath + '/dist';
var src  = global.gulpOptions.frontPath + '/src';

module.exports = {
  clean: {
    files: [ dest ]
  },
  html: {
    src: src + "/html/views/*.html",
    dest: dest + "/views"
  },
  css: {
    src: src + "/scss/**/*.css",
    dest: dest + "/css"
  },
  sass: {
    src: src + "/scss/**/*.scss",
    dest: dest + "/css"
  },
  tpl: {
    src: src + "/html/tpl/*.html",
    dest: dest + "/tpl"
  },
  script: {
    src: src + "/js/**/*",
    dest: dest + "/js"
  },
  lib: {
    src: src + "/lib/**/*",
    dest: dest + "/lib"
  },
  images: {
    src: [src + "/images/**/*"],
    dest: dest + "/images"
  },
  media: {
    src: [src + "/media/**/*"],
    dest: dest + "/media"
  },
  browserify: {
    bundleConfigs: [
      {
        entries: src + '/react/helloworld.jsx',
        dest: dest,
        outputName: 'js/helloworld.bundle.js',
        literal: {
          react: 'window.react'
        },
        extensions: ['.js', '.jsx']
      }
    ]
  },
  nodemon: {
    script: 'server.js',
    watch: ['server.js']
  }
};
