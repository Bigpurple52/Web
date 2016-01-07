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
            if (!$scope.mail || !$scope.pass || !$scope.pass2 || !$scope.pseudo) {
                return;
            }

            if($scope.pass == $scope.pass2){
                userProfile.updateUser({
                    id: sessionStorage.getItem('id'),
                    mail: $scope.mail,
                    pass: $scope.pass,
                    pseudo: $scope.pseudo
                });         
                $scope.pass = '';
                $scope.pass2 = '';
            }else{
                $scope.pass = '';
                $scope.pass2 = '';
            }
            alert("Modification effectuée");
            document.location.href='/';
        };

        $scope.addFriend = function() {
            if (!$scope.friendMail) {
                return;
            }
            userProfile.addFriend({
                id: sessionStorage.getItem('id'),
                usermail: sessionStorage.getItem('mail'),
                userpseudo: sessionStorage.getItem('pseudo'),
                friendmail: $scope.friendMail
            });   

            $scope.friendMail = '';
            document.location.href='#/userProfile/'+sessionStorage.getItem('id');
        };

        $scope.removeFriend = function() {
            if (!$scope.unfriendMail) {
                return;
            }
            userProfile.removeFriend({
                id: sessionStorage.getItem('id'),
                mail: $scope.unfriendMail
            });   

            $scope.unfriendMail = '';
            document.location.href='#/userProfile/'+sessionStorage.getItem('id');
        };

        $scope.createGroup = function() {
            if (!$scope.groupName) {
                return;
            }
            userProfile.createGroup({
                name: $scope.groupName,
                users: {'_id' : sessionStorage.getItem('id'), 'pseudo': sessionStorage.getItem('pseudo')},
            });   

            $scope.groupName = '';
            document.location.href='#/userProfile/'+sessionStorage.getItem('id');
        };

        $scope.addGroup = function() {
            if (!$scope.groupName2 && !$scope.friendMail) {
                return;
            }
            userProfile.addGroup({
                name: $scope.groupName2,
                friendMail: $scope.friendMail,
                id: sessionStorage.getItem('id'),
                userMail: sessionStorage.getItem('mail'),
                userPseudo: sessionStorage.getItem('pseudo'),
            });   

            $scope.groupName2 = '';
            $scope.friendMail = '';
            document.location.href='#/userProfile/'+sessionStorage.getItem('id');
        };
    }
]);