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
            if(typeof group.bill !== 'undefined' && group.bill.lenght>0){
    			for (var bill of group.bill){
    				$scope.balance.set(bill.buyer.mail,bill.buyer.cost);
    				for (var user of bill.users){
    					$scope.balance.set(user.mail, scope.balance.get(user.mail)- user.cost);
    				}
        		}
            }
            if(typeof group.payments !== 'undefined' && group.payments.lenght>0)
    		for (var payment in group.payments){
				$scope.balance.set(payment.buyer.mail,payment.buyer.cost);
				for (var user in bill.users){
					$scope.balance.set(user.mail, scope.balance.get(user.mail)- user.cost);
				}
    		}
    	}

    	$scope.CreateBillGroup = function(){
            if (!$scope.descript || !$scope.montant || !$scope.buyer || !$scope.owner) {
                return;
            }
            var date = new Date();
            var tmpGroupId = $scope.group._id;
            var tmpBuyer = $scope.buyer;
            var tmpDescript = $scope.descript;
            var tmpCost = $scope.montant;
            var tmpUsers = $scope.owner;
            $scope.descript="";
            $scope.montant="";
            $scope.buyer="";
            $scope.owner="";

            group.createBill({
            	groupeid : tmpGroupId,
            	buyer : tmpBuyer,
            	descript :tmpDescript ,
            	cost : tmpCost,
            	users : tmpUsers,
            	date : date
            }, function(data){
	            alert("Modification effectuée");
                document.location.href='#/group/'+$scope.group._id;
            });
    	}
    }
]);