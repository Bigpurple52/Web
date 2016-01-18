//group controller
angular.module('group').controller('GroupCtrl', [
    '$scope',
    'group',
    function($scope, group) {
        $scope.group = group.group;
    }
]);