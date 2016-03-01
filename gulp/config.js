var app = global.gulpOptions.backPath + '/app';
var frontend = global.gulpOptions.backPath + '/frontend';
var dist = frontend + '/dist';
var public  = global.gulpOptions.backPath + '/public';

module.exports = {
  public: public,
  clean: {
    files: [ public, app + "/views" ]
  },
  views: {
    dist: dist + "/views/*.html",
    public: app + "/views"
  },
  css: {
    dist: dist + "/css/**/*.css",
    public: public + "/css"
  },
  script: {
    dist: dist + "/js/**/*",
    public: public + "/js"
  },
  tpl: {
    dist: dist + "/tpl/*.html",
    public: public + "/views"
  },
  lib: {
    dist: dist + "/lib/**/*",
    public: public + "/lib"
  },
  images: {
    dist: [dist + "/images/**/*"],
    public: public + "/images"
  },
  media: {
    dist: dist + "/media/**/*",
    public: public + "/media"
  },
  nodemon: {
    script: 'server.js',
    ext: 'js html',
    env: {
      'NODE_ENV': 'development'
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
