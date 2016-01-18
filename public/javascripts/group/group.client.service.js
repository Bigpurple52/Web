//Service
angular.module('group').factory('group', ['$http', function($http) {
    var o = {
        group : []
    };
/*
	o.getAll = function() {
        return $http.get('/group/').success(function(data) {
            angular.copy(data, o.group);
        });
    };*/

    o.getOne = function(id) {
        return $http.get('/group/'+ id).success(function(data) {
            angular.copy(data, o.group);
        });
    };

    o.createBill = function(bill, callback){
        return $http.put('/group/'+ bill.groupeid, bill).success(function(response) {
            callback(response);
        });
    }

    return o;
}]);