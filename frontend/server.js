'use strict';

var express = require('express');

var app = express();
var port = 8082;

app.use(express.static(__dirname + '/dist'));

app.listen(port);

console.log('Express app started on port ' + port);
