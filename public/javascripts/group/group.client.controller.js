//group controller
angular.module('group').controller('GroupCtrl', [
    '$scope',
    'group',

    function($scope, group) {
        $scope.group = group.group;
        $scope.balance = new Map();

        $scope.init = function(){
        	$scope.calculateBalance();
        }

        //A TESTER
        $scope.calculateBalance = function(){
        	for (var user of $scope.group.users){
        		$scope.balance.set(user.mail,0);
        	}
			for (var bill of group.bill){
				$scope.balance.set(bill.buyer.mail,bill.buyer.cost);
				for (var user of bill.users){
					$scope.balance.set(user.mail, scope.balance.get(user.mail)- user.cost);
				}
    		}
    		for (var payment in group.payments){
				$scope.balance.set(payment.buyer.mail,payment.buyer.cost);
				for (var user in bill.users){
					$scope.balance.set(user.mail, scope.balance.get(user.mail)- user.cost);
				}
    		}
    	}
    }
]);