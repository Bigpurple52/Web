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
            if (!$scope.group._id || !$scope.descriptbill || !$scope.montantbill || !$scope.buyerbill || !$scope.ownerbill) {
                return;
            }
            var date = new Date();
            var tmpGroupId = $scope.group._id;
            var tmpBuyer = $scope.buyerbill;
            var tmpDescript = $scope.descriptbill;
            var tmpCost = $scope.montantbill;
            var tmpUsers = $scope.ownerbill;
            $scope.descriptbill="";
            $scope.montantbill="";
            $scope.buyerbill="";
            $scope.ownerbill="";

            group.createBill({
                typebp : "bill",
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

        $scope.CreatePaymentGroup = function(){
            console.log("début création d'un payment");
            if (!$scope.group._id || !$scope.descriptpayment || !$scope.montantpayment || !$scope.giverpayment || !$scope.recieverpayment) {
                return;
            }
            console.log("début après création d'un payment");

            var date = new Date();
            var tmpGroupId = $scope.group._id;
            var tmpGiver = $scope.giverpayment;
            var tmpDescript = $scope.descriptpayment;
            var tmpCost = $scope.montantpayment;
            var tmpReciever = $scope.recieverpayment;

            $scope.descriptpayment="";
            $scope.montantpayment="";
            $scope.giverpayment="";
            $scope.recieverpayment="";
            console.log("création d'un payment");
            group.createPayment({
                typebp: "payment",
                groupeid : tmpGroupId,
                giver : tmpGiver,
                descript :tmpDescript ,
                cost : tmpCost,
                reciever : tmpReciever,
                date : date
            }, function(data){
                alert("Modification effectuée");
                document.location.href='#/group/'+$scope.group._id;
            });
        }
    }
]);