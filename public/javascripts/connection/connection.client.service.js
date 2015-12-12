//Service
angular.module('connection').factory('connection', ['$http', function($http) {
    var o = {
        users : []
    };

    o.getAll = function() {
        return $http.get('/connection').success(function(data) {
            angular.copy(data, o.users);
        });
    };

    return o;
}]);