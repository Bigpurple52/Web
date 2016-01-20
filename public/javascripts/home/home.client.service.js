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

    o.getFriends = function(mail,callback){
        return $http.get('/side_menu/friends/' + mail).success(function(data) {
            angular.copy(data, o.friends);
            callback(data);
        });
    };

    o.getGroups = function(mail,callback) {
        return $http.get('/side_menu/groups/' + mail).success(function(data) {
            angular.copy(data, o.groups);
            callback(data);
        });
    };

    return o;
}]);