angular.module('side_menu').factory('side_menu', ['$http', function($http) {
    var o = {
        friends : [],
        groups : []
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