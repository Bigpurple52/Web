//home controller
angular.module('home').controller('HomeCtrl', [
    '$scope',
    'home',
    function($scope, home) {
        $scope.home = home.home;
        
        $scope.init = function(){
	        if(!sessionStorage.getItem('id')){
	        	document.location.href='#/connection';
	        }
   	 	}
    }
]);