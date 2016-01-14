//Service
angular.module('group').factory('group', ['$http', function($http) {
    var o = {
        users : []
    };

    o.getAll = function() {
        return $http.get('/group').success(function(data) {
            angular.copy(data, o.users);
        });
    };

    return o;
}]);