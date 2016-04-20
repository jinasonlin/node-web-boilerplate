var requireDir = require('require-dir');

global.gulpOptions = {
  watch: false,
  bs: false,
  bsReload: function bsReloadLog() {
    return global.console.log;
  },
  prefix: 'front:',
  image: false,
  lib: false,
  development: true,
  backPath: __dirname
};

require('./frontend/gulpfile');
requireDir('./gulp/tasks', { recurse: true });
