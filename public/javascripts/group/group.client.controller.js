//group controller
angular.module('group').controller('GroupCtrl', [
    '$scope',
    'group',

    function($scope, group) {
        $scope.group = group.group;
        $scope.balance = new Map();

        $scope.init = function(){
        	$scope.calculateBalance();
            $scope.sortBillPayment();
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
           /*
            if(typeof $scope.group.payments !== 'undefined' && $scope.group.payments.length>0)
                for (var payment in $scope.group.payments){
                    $scope.balance.set(payment.buyer.mail,$scope.balance.get(bill.buyer.mail) + payment.buyer.cost);
                    for (var user in bills.users){
                        $scope.balance.set(user.mail, scope.balance.get(user.mail)- user.cost);
                    }
                }*/
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

        $scope.toDateString= function(date){
            var d = new Date(date)
            return d.toDateString();
        }

        $scope.DisplayObject= function(o){
            var res;
            if(typeof o.giver !== 'undefined' ){
                res = $scope.DisplayPayment(o);
                
            }else{
                res = $scope.DisplayBill(o);
            }
            return res;
        }

        $scope.DisplayBill = function(bill){
            var res = $scope.toDateString(bill.date)+"  "+ bill.descript +" : "+bill.buyer.pseudo+" a payé "+ bill.buyer.cost+ "€" ;
            return res;
        }

        $scope.DisplayPayment= function(payment){
            var res = $scope.toDateString(payment.date)+"  "+payment.descript+" : "+payment.giver.pseudo+" a donné "+payment.cost+"€ à "+payment.reciever.pseudo;
            return res;
        }

        $scope.sortBillPayment= function(){
            var bill =0;
            var payment =0;
            var res = [];

            while(bill<$scope.group.bills.length || payment <$scope.group.payments.length){
                if(bill >= $scope.group.bills.length && payment < $scope.group.payments.length){
                    res.push($scope.group.payments[payment]);
                    payment += 1;

                }
                if(payment >= $scope.group.payments.length && bill<$scope.group.bills.length){
                    res.push($scope.group.bills[bill]);
                    bill += 1;
                }
                if(bill<$scope.group.bills.length && payment <$scope.group.payments.length){
                    var DateBill = new Date($scope.group.bills[bill]);
                    var DatePayment = new Date($scope.group.payments[payment]);
                    if(DateBill.getTime() > DatePayment.getTime()){  //Get the time (milliseconds since January 1, 1970)
                        res.push($scope.group.payments[payment]);
                        payment += 1;
                    }else{
                        res.push($scope.group.bills[bill]);
                        bill += 1;
                    }
                }    
            }
            console.log(res);
            res.reverse();
            $scope.BillPaymentSorted = res;
        }

    }
]);