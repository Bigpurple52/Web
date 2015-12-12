//connection controller
angular.module('connection').controller('ConnectionCtrl', [
    '$scope',
    'connection',
    function($scope, connection) {
        $scope.connection = connection.connection;
    }
]);