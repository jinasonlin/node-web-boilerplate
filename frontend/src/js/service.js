'use strict';

angular.module('demo', [])
  .service('DemoService', function () {
    var value = 'hello world! by service';
    this.getValue = function () {
      return value;
    };
    this.setValue = function (v) {
      value = v;
    };
  });