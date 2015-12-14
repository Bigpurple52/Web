//Service
angular.module('register').factory('register', ['$http', function($http) {
    var o = {
        users : []
    };

    o.getAll = function() {
        return $http.get('/register').success(function(data) {
            angular.copy(data, o.users);
        });
    };

    o.createUser = function(user) {
        return $http.post('/register', user).success(function(data) {
            if(data == 'erreur'){
                alert('Adresse mail déjà utilisée');
            }else{
               	o.users.push(data);
                document.location.href = "#/connection";
                alert('Inscription réussie !');
            }
        });
    };

    return o;
}]);