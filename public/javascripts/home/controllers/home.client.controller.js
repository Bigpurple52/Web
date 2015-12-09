//Backlog controller
angular.module('home').controller('HomeCtrl', [
    '$scope',
    'home',
    function($scope, home) {
        $scope.home = home.home;
    }
]);