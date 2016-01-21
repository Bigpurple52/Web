//Service
angular.module('friend').factory('friend', ['$http', function($http) {
    var o = {
        friend : []
    };
/*
    o.getAll = function() {
        return $http.get('/friend/').success(function(data) {
            angular.copy(data, o.users);
        });
    };*/

    o.getOne = function(id) {
        return $http.get('/friend/'+ id).success(function(data) {
            angular.copy(data, o.friend);
        });
    };

    o.createBill = function(bill, callback){
        return $http.put('/friend/'+ bill.groupeid, bill).success(function(response) {
            callback(response);
        });
    }

    o.createPayment = function(payment, callback){
        return $http.put('/friend/'+ payment.groupeid, payment).success(function(response) {
            callback(response);
        });
    }

    return o;
}]);