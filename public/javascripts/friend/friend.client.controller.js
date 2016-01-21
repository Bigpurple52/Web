//friend controller
angular.module('friend').controller('FriendCtrl', [
    '$scope',
    'friend',
	function($scope, friend) {
        $scope.friend = friend.friend;
        $scope.balance = new Map();

        $scope.init = function(){
            $scope.calculateBalance();
            $scope.sortBillPayment(function(){
                $scope.n =0;
                $scope.DisplayHistorique();
            });
        }

		$scope.isMe=function(id){
			var isMe=false;
			if(id==sessionStorage.getItem('id')){
				isMe = true;
			}
			return isMe;
		}

        $scope.calculateBalance = function(){
            for (var user of $scope.friend.users){
                $scope.balance.set(user.mail,0);
            }
           if(typeof $scope.friend.bills !== 'undefined' && $scope.friend.bills.length>0){
                for (var bill of $scope.friend.bills){
                    $scope.balance.set(bill.buyer.mail,$scope.balance.get(bill.buyer.mail)+bill.buyer.cost);
                    for (var user of bill.users){
                        $scope.balance.set(user.mail, $scope.balance.get(user.mail)- user.cost);
                    }
                }
           }
           console.log($scope.friend);
           
            if(typeof $scope.friend.payments !== 'undefined' && $scope.friend.payments.length>0)
                for (var payment of $scope.friend.payments){
                    $scope.balance.set(payment.giver.mail,$scope.balance.get(payment.giver.mail) + payment.cost);
                    $scope.balance.set(payment.reciever.mail,$scope.balance.get(payment.reciever.mail)- payment.cost);
                    
                }
        }

    	$scope.CreateBillFriend = function(){
            if (!$scope.friend._id || !$scope.descriptbill || !$scope.montantbill || !$scope.buyerbill || !$scope.ownerbill) {
                return;
            }
            var date = new Date();
            var identifier = Date.now()+""+Math.floor(Math.random() * 100) + 1;
            var tmpGroupId = $scope.friend._id;
            var tmpBuyer = $scope.buyerbill;
            var tmpDescript = $scope.descriptbill;
            var tmpCost = $scope.montantbill;
            var tmpUsers = $scope.ownerbill;
            $scope.descriptbill="";
            $scope.montantbill="";
            $scope.buyerbill="";
            $scope.ownerbill="";

            friend.createBill({
                identifier: identifier,
                typebp : "bill",
            	groupeid : tmpGroupId,
            	buyer : tmpBuyer,
            	descript :tmpDescript ,
            	cost : tmpCost,
            	users : tmpUsers,
            	date : date
            }, function(data){
	            alert("Modification effectuée");
                document.location.reload();
            });
    	}

        $scope.CreatePaymentFriend = function(){
            console.log("début création d'un payment");
            if (!$scope.friend._id || !$scope.descriptpayment || !$scope.montantpayment || !$scope.giverpayment || !$scope.recieverpayment) {
                return;
            }
            console.log("début après création d'un payment");

            var date = new Date();
            var identifier = Date.now()+""+Math.floor(Math.random() * 100) + 1;
            var tmpGroupId = $scope.friend._id;
            var tmpGiver = $scope.giverpayment;
            var tmpDescript = $scope.descriptpayment;
            var tmpCost = $scope.montantpayment;
            var tmpReciever = $scope.recieverpayment;

            $scope.descriptpayment="";
            $scope.montantpayment="";
            $scope.giverpayment="";
            $scope.recieverpayment="";
            console.log("création d'un payment");
            friend.createPayment({
                identifier: identifier,
                typebp: "payment",
                groupeid : tmpGroupId,
                giver : tmpGiver,
                descript :tmpDescript ,
                cost : tmpCost,
                reciever : tmpReciever,
                date : date
            }, function(data){
                alert("Modification effectuée");
                document.location.reload();
            });
        }

        $scope.DisplayBalance = function(user){
            var b = $scope.balance.get(user.mail)
            var res = user.pseudo +" : ";

            if( b < 0){
                res += "Doit "+b *(-1)+'€';
            }
            if( b > 0){
                res += "A avancer "+ b + "€";
            }
            if( b== 0){
                res += "Ne doit rien";
            }
            return res;
        }


        $scope.sortBillPayment= function(callback){
            var bill =0;
            var payment =0;
            var res = [];

            while(bill<$scope.friend.bills.length || payment <$scope.friend.payments.length){
                if(bill >= $scope.friend.bills.length && payment < $scope.friend.payments.length){
                    res.push($scope.friend.payments[payment]);
                    payment += 1;

                }
                if(payment >= $scope.friend.payments.length && bill<$scope.friend.bills.length){
                    res.push($scope.friend.bills[bill]);
                    bill += 1;
                }
                if(bill<$scope.friend.bills.length && payment <$scope.friend.payments.length){
                    var DateBill = new Date($scope.friend.bills[bill].date);
                    var DatePayment = new Date($scope.friend.payments[payment].date);
                    if(DateBill.getTime() > DatePayment.getTime()){  //Get the time (milliseconds since January 1, 1970)
                        res.push($scope.friend.payments[payment]);
                        payment += 1;
                    }else{
                        res.push($scope.friend.bills[bill]);
                        bill += 1;
                    }
                }    
            }
            console.log(res);
            res.reverse();
            $scope.BillPaymentSorted = res;
            callback();
        }

        $scope.DisplayHistorique= function(){
            var list = $scope.BillPaymentSorted;
            if(typeof list !== 'undefined' && list.length>0){
                for (var o of list){
                    DisplayTradeHTML($scope.friend,o);
                }
            }
        }

    }

]);