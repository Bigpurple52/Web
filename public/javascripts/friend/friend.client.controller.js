//friend controller
angular.module('friend').controller('FriendCtrl', [
    '$scope',
    'friend',
	function($scope, group) {
        $scope.group = group.group;
    }
]);