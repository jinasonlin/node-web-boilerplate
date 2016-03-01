var requireDir = require('require-dir');

global.gulpOptions = {
  prefix: 'front:',
  image: false,
  lib: false,
  development: true,
  backPath: __dirname 
};

require('./frontend/gulpfile');
requireDir('./gulp/tasks', { recurse: true });
