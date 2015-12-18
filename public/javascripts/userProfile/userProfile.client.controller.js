//home controller
angular.module('userProfile').controller('UserProfileCtrl', [
    '$scope',
    'userProfile',
    function($scope, userProfile) {
        $scope.userProfile = userProfile.userProfile;

        $scope.init = function(){
            var url = window.location.href;
            url = url.substr(url.lastIndexOf("/")+1);
            if(!sessionStorage.getItem('id')){
                document.location.href='#/connection';
            }else if(sessionStorage.getItem('id') != url){
                document.location.href='#/home';
            }else{
    	        $scope.mail = sessionStorage.getItem('mail');
    	        $scope.pass = '';
    	        $scope.pass2 = '';
    	        $scope.pseudo = sessionStorage.getItem('pseudo');
            }
   	 	}

        $scope.deleteUser = function() {
            if (!$scope.check) {
                return;
            }
            userProfile.deleteUser({
                id: sessionStorage.getItem('id')
            })

            sessionStorage.clear();
            alert("Ce compte a été supprimé définitivement");
            document.location.href='/';
        };

        $scope.updateUser = function() {

            /*if (!$scope.mail || !$scope.pass || !$scope.pass2 || !$scope.pseudo) {
                return;
            }

            if($scope.pass == $scope.pass2){
                register.createUser({
                    mail: $scope.mail,
                    pass: $scope.pass,
                    pseudo: $scope.pseudo,
                    friend: ""
                });
                
                $scope.mail = '';
                $scope.pass = '';
                $scope.pass2 = '';
                $scope.pseudo = '';
            }else{
                $scope.pass = '';
                $scope.pass2 = '';
            }*/
        };
    }
]);