angular.module('side_menu').controller('Side_menuCtrl', [
	'$scope',
	'side_menu',
	function($scope, side_menu) {
		$scope.side_menu= side_menu.side_menu;

		$scope.init = function(){
        	$scope.getFriends();
			$scope.getGroups();
			window.setInterval(function(){
				$scope.getFriends();
				$scope.getGroups();
			},5000);
   	 	}

		$scope.getGroups=function (){
			side_menu.getGroups(sessionStorage.getItem('mail'),function (data){
			$scope.listGroups = data;
			});
		}

		$scope.getFriends=function(){
			side_menu.getFriends(sessionStorage.getItem('mail'),function (data){
			$scope.listFriends = data;
			});
		}

		$scope.isMe=function(id){
			var isMe=false;
			if(id==sessionStorage.getItem('id')){
				isMe = true;
			}
			return isMe;
		}
	}
]);
