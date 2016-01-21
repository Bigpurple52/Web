//Service
angular.module('allExpenses').factory('allExpenses', ['$http', function($http) {
    var o = {
        allExpenses: []
    };

	o.get = function(id) {
        return $http.get('/allExpenses/'+ id ).success(function(data) {
            angular.copy(data, o.allExpenses);
        });
    };

    return o;
}]);