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

        $scope.calculateBalance = function(){
            for (var user of $scope.group.users){
                $scope.balance.set(user.mail,0);
            }
           if(typeof $scope.group.bills !== 'undefined' && $scope.group.bills.length>0){
                for (var bill of $scope.group.bills){
                    $scope.balance.set(bill.buyer.mail,$scope.balance.get(bill.buyer.mail)+bill.buyer.cost);
                    for (var user of bill.users){
                        $scope.balance.set(user.mail, $scope.balance.get(user.mail)- user.cost);
                    }
                }
           }

            if(typeof $scope.group.payments !== 'undefined' && $scope.group.payments.length>0)
                for (var payment in $scope.group.payments){
                    $scope.balance.set(payment.buyer.mail,$scope.balance.get(bill.buyer.mail) + payment.buyer.cost);
                    for (var user in bills.users){
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