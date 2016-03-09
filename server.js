'use strict';

var fs = require('fs');
var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('./config/config');

var app = express();
var port = 8081;

/**
 *
 * development
 * ** NODE_ENV=development pm2 start server.js --name Core
 *
 * producation
 * ** NODE_ENV=production pm2 start server.js --name Core -i 0 --max-memory-restart 512M
 */


// // Connect to mongodb
// var connect = function () {
//   var options = {server: {socketOptions: {keepAlive: 1}}, replset: {socketOptions: {keepAlive: 1}}, mongos: true};
//   mongoose.connect(config.db, options);
// };
// connect();

// mongoose.connection.on('error', function () {
//   process.exit();
// });
// mongoose.connection.on('disconnected', connect);


// // Bootstrap models
// fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
//   if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file);
// });

// Bootstrap extension
require('./config/extension');

// Bootstrap passport config
// require('./config/passport')(passport, config);

// Bootstrap application settings
require('./config/express')(app, passport);

// Bootstrap route
require('./config/route/index')(app);
require('./config/routes')(app);

app.listen(port);

app.enable('trust proxy');

console.log('Express app started on port ' + port);
