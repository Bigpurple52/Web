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

    o.editBill= function(bill, callback){
        return $http.put('/edit/bill/'+ bill.groupeid+'/'+bill.identifier, bill).success(function(response) {
            callback(response);
        });
    }

    return o;
}]);