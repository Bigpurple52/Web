//Service
angular.module('connection').factory('connection', ['$http', function($http) {
    var o = {
        users : []
    };

    o.getAll = function() {
        return $http.get('/connection').success(function(data) {
            angular.copy(data, o.users);
        });
    };

    o.connected = function (user) {
    	return $http.post('/connection', user).success(function(data) {
    		if(data.length != 0){
                sessionStorage.setItem('id', data[0]._id);
    			sessionStorage.setItem('mail', data[0].mail);
                sessionStorage.setItem('pseudo', data[0].pseudo);
    			document.location.href = "/";
    		}else{
    			document.location.href = "#/connection/?q=false";
    		}
        })
    }

    return o;
}])