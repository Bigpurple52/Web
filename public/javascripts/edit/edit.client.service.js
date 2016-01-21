//Service
angular.module('edit').factory('edit', ['$http', function($http) {
    var o = {
        groupbillpayment: []
    };

    o.getBill = function(id, idbill) {
        return $http.get('/edit/bill/'+ id+'/'+idbill).success(function(data) {
            angular.copy(data, o.groupbillpayment);
        });
    };

    o.getPayment = function(id, idpayment){
        return $http.get('/edit/payment/'+ id+'/'+idpayment).success(function(data) {
            angular.copy(data, o.groupbillpayment);
        });
    }

    o.editBill= function(bill, callback){
        return $http.put('/edit/bill/'+ bill.groupeid+'/'+bill.identifier, bill).success(function(response) {
            callback(response);
        });
    }
    o.editPayment= function(payment, callback){
        return $http.put('/edit/payment/'+ payment.groupeid+'/'+payment.identifier, payment).success(function(response) {
            callback(response);
        });
    }

    return o;
}]);