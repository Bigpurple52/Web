//Service
angular.module('userProfile').factory('userProfile', ['$http', function($http) {
    var o = {
        userProfile : []
    };

    o.getAll = function(id) {
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

    o.addFriend = function(user) {
        return $http.put('/userProfile/' + user.id, user).success(function(response) {
            alert(response);
            return response;
        });
    };

    o.removeFriend = function(user) {
        return $http.delete('/userProfile/' + user.id + '/' + user.mail).success(function(response) {
            alert(response);
            return response;
        });
    };

    o.createGroup = function(group) {
        return $http.post('/userProfile/' + group.users._id, group).success(function(response) {
            alert(response);
            return response;
        });
    };

     o.addGroup = function(group) {
        return $http.put('/userProfile/' + group.id +'/adduser', group).success(function(response) {
            alert(response);
            return response;
        });
    };

    return o;
}]);