//register controller
angular.module('register').controller('RegisterCtrl', [
    '$scope',
    'register',
    function($scope, register) {
        $scope.register = register.register;
    }
]);