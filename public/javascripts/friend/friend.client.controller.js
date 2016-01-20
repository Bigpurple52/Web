//friend controller
angular.module('friend').controller('FriendCtrl', [
    '$scope',
    'friend',
	function($scope, friend) {
        $scope.friend = friend.friend;

		$scope.isMe=function(id){
			var isMe=false;
			if(id==sessionStorage.getItem('id')){
				isMe = true;
			}
			return isMe;
		}
    }
]);