var requireDir = require('require-dir');

global.gulpOptions = global.gulpOptions ?
  global.gulpOptions : {
    development: true
  };
if (!global.gulpOptions.prefix) {
  global.gulpOptions.prefix = '';
}
global.gulpOptions.frontPath = __dirname;

requireDir('./gulp/tasks', { recurse: true });
