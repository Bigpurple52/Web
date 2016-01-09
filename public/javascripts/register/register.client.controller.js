//register controller
angular.module('register').controller('RegisterCtrl', [
    '$scope',
    'register',
    function($scope, register) {
        $scope.register = register.register;

        $scope.addUser = function() {

            if (!$scope.mail || !$scope.pass || !$scope.pass2 || !$scope.pseudo) {
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
            }
        };
    }
]);