//Service
angular.module('register').factory('register', ['$http', function($http) {
    var o = {
        users : []
    };

    o.getAll = function() {
        return $http.get('/register').success(function(data) {
            angular.copy(data, o.users);
        });
    };

    o.createUser = function(user) {
        return $http.post('/register', user).success(function(data) {
           	o.users.push(data);
        });
    };

    return o;
}]);