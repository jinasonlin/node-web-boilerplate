angular.module('demo')
  .controller('DemoCtrl', ['$scope', '$timeout', 'DemoService', function ($scope, $timeout, DemoService) {
    var vm = $scope.vm = {
      init: function () {
        $timeout(function () {
          vm.getValue();
        }, 5000);
      },
      getValue: function () {
        vm.value = DemoService.getValue();
      },
      setValue: function () {
        DemoService.setValue('hello world! by setValue');
        vm.getValue();
      },
      value: 'hello world!'
    };

    vm.init();
  }]);
