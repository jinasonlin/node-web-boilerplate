var app = global.gulpOptions.backPath + '/app';
var frontend = global.gulpOptions.backPath + '/frontend';
var dist = frontend + '/dist';
var staticResource = global.gulpOptions.backPath + '/public';

module.exports = {
  public: staticResource,
  clean: {
    files: [staticResource, app + '/views']
  },
  views: {
    dist: dist + '/views/**/*',
    public: app + '/views'
  },
  css: {
    dist: dist + '/css/**/*.css',
    public: staticResource + '/css'
  },
  script: {
    dist: dist + '/js/**/*.js',
    public: staticResource + '/js'
  },
  tpl: {
    dist: dist + '/tpl/**/*',
    public: staticResource + '/views'
  },
  lib: {
    dist: dist + '/lib/**/*',
    public: staticResource + '/lib'
  },
  images: {
    dist: [dist + '/images/**/*'],
    public: staticResource + '/images'
  },
  media: {
    dist: dist + '/media/**/*',
    public: staticResource + '/media'
  },
  nodemon: {
    script: 'server.js',
    ext: 'js html',
    env: {
      NODE_ENV: 'development'
    },
    ignore: [
      '.git',
      'node_modules',
      'gulp',
      'app/views',
      'frontend',
      'public'
    ]
  }
};
