//friend controller
angular.module('friend').controller('FriendCtrl', [
    '$scope',
    'friend',
    function($scope, friend) {
        $scope.friend = friend.friend;

    }
]);