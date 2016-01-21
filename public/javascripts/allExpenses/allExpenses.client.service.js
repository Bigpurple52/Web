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

   	o.deletePayment = function(payment, callback){
        return $http.get('/delete/payment/'+payment.idgroup+'/'+payment.idpayment).success(function(response) {
            callback(response);
        });
    }

    o.deleteBill = function(bill, callback){
        return $http.get('/delete/bill/'+bill.idgroup+'/'+bill.idbill).success(function(response) {
            callback(response);
        });
    }

    return o;
}]);