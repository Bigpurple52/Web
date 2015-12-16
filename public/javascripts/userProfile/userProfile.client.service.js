//Service
angular.module('userProfile').factory('userProfile', ['$http', function($http) {
    var o = {
        userProfile : []
    };

    var idUser;

    o.setIdUser = function(id) {
        idUser = id;
    };

    o.get = function(id) {
        return $http.get('/userProfile/' + id).success(function(data) {
        	angular.copy(data, o.userProfile);
        });
    };

    return o;
}]);