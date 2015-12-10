//Backlog controller
angular.module('test').controller('TestCtrl', [
    '$scope',
    'test',
    function($scope, test) {
        $scope.test = test.test;
    }
]);