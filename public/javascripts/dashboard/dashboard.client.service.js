//Service
angular.module('dashboard').factory('dashboard', ['$http', function($http) {
    var o = {
        dashboard : []
    };

	o.get = function(id) {
        return $http.get('/dashboard/'+ id ).success(function(data) {
            angular.copy(data, o.dashboard);
        });
    };

    return o;
}]);