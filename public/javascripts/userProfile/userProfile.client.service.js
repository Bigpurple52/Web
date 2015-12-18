//Service
angular.module('userProfile').factory('userProfile', ['$http', function($http) {
    var o = {
        userProfile : []
    };

    o.get = function(id) {
        return $http.get('/userProfile/' + id).success(function(data) {
        	angular.copy(data, o.userProfile);
        });
    };

    o.deleteUser = function(user) {
        return $http.delete('/userProfile/' + user.id).success(function(response) {
        	return response;
        });
    };

    o.updateUser = function(user) {
        return $http.put('/userProfile/' + user.id, user).success(function(response) {
        	sessionStorage.setItem('mail', response.mail);
            sessionStorage.setItem('pseudo', response.pseudo);
            sessionStorage.setItem('pass', response.pass);
            return response;
        });
    };

    return o;
}]);