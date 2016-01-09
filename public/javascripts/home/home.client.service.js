//Service
angular.module('home').factory('home', ['$http', function($http) {
    var o = {
        users : []
    };

    o.getAll = function() {
        return $http.get('/home').success(function(data) {
            angular.copy(data, o.users);
        });
    };

    return o;
}]);