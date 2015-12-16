//home controller
angular.module('userProfile').controller('UserProfileCtrl', [
    '$scope',
    'userProfile',
    function($scope, userProfile) {
        $scope.userProfile = userProfile.userProfile;
    }
]);