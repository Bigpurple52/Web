//Service
angular.module('friend').factory('friend', ['$http', function($http) {
    var o = {
        users : []
    };

    o.getAll = function() {
        return $http.get('/friend').success(function(data) {
            angular.copy(data, o.users);
        });
    };

    return o;
}]);