//connection controller
angular.module('connection').controller('ConnectionCtrl', [
    '$scope',
    'connection',
    function($scope, connection) {
        $scope.connection = connection.connection;
    
        $scope.validation = getValidation();

        $scope.connection = function() {

            if (!$scope.mail || !$scope.pass) {
                return;
            }

            connection.connected({
                mail: $scope.mail,
                pass: $scope.pass
            });

            $scope.mail = '';
            $scope.pass = '';
        };

        function getValidation () {
           var str = window.location.href;
           str = str.substr(str.search("=")+1);
           if(str == "false"){
                return false;
           }else{
                return true;
           }
        }
    }
]);