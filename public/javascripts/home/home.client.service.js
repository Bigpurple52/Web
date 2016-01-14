//Service
angular.module('home').factory('home', ['$http', function($http) {
    var o = {
        groups : []
    };

    o.getAll = function() {
        return $http.get('/home').success(function(data) {
            angular.copy(data, o.groups);
        });
    };

    return o;
}]);