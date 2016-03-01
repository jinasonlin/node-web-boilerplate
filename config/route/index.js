'use strict';

var index = require('../../app/controllers/index');

module.exports = function (app, passport) {
  app.get('/', index.index);
};
