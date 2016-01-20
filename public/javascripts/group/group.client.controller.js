//group controller
angular.module('group').controller('GroupCtrl', [
    '$scope',
    'group',

    function($scope, group) {
        $scope.group = group.group;
        $scope.balance = new Map();

        $scope.init = function(){
        	$scope.calculateBalance();
            $scope.sortBillPayment(function(){
                $scope.DisplayHistorique();
            });
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
           console.log($scope.group);
           
            if(typeof $scope.group.payments !== 'undefined' && $scope.group.payments.length>0)
                for (var payment of $scope.group.payments){
                    $scope.balance.set(payment.giver.mail,$scope.balance.get(payment.giver.mail) + payment.cost);
                    $scope.balance.set(payment.reciever.mail,$scope.balance.get(payment.reciever.mail)- payment.cost);
                    
                }
        }
     //var res = $scope.toDateString(payment.date)+"  "+payment.descript+" : "+payment.giver.pseudo+" a donné "+payment.cost+"€ à "+payment.reciever.pseudo;
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
                document.location.reload();
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

        $scope.toDateString= function(date){
            var d = new Date(date)
            return d.toDateString();
        }


        $scope.sortBillPayment= function(callback){
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
            callback();
        }

        $scope.DisplayHistorique= function(){
            var list = $scope.BillPaymentSorted;
            if(typeof list !== 'undefined' && list.length>0){
                for (var o of list){
                    DisplayObjectHTML(o);
                }
            }
        }

        DisplayObjectHTML= function(o){
            var res;
            if(typeof o.giver !== 'undefined' ){
                DisplayPaymentHTML(o);
                
            }else{
                DisplayBillHTML(o);
            }
        }

        DisplayBillHTML = function(bill){
            var HTML = "";
            HTML+="<span class=\"glyphicon glyphicon-list-alt\"></span>    ";
            HTML+=$scope.toDateString(bill.date)+"  "+ bill.descript +" : "+bill.buyer.pseudo+" a payé "+ bill.buyer.cost+ "€";

            var tmp = calculateBalanceForOneBill(bill);
            if(tmp==0){
                HTML+=", Ne vous concerne pas <br/>";
            }
            if(tmp < 0){
                HTML+=", Tu dois " + (-1)*calculateBalanceForOneBill(bill) +"€ <br/>";
            }
            if(tmp> 0){
                HTML+=", On te dois "+calculateBalanceForOneBill(bill) +"€ <br/>";
            }

            HTML+="<div class=\"ng-hide\">";
            for (var user of bill.users){
                HTML+= user.pseudo +" doit "+ user.cost+"€ <br/>";
            }
            HTML+="</div>";

            var newDiv = document.createElement('div');
            newDiv.setAttribute("onClick","showHiddenDiv(this)");
            document.getElementById('divDashboardGroup').appendChild(newDiv);

            newDiv.innerHTML = HTML;

        }

        DisplayPaymentHTML= function(payment){
            var HTML = "";
            HTML+="<span class=\"glyphicon glyphicon-eur\"></span>    ";
            HTML+=$scope.toDateString(payment.date)+"  "+payment.descript+" : "+payment.giver.pseudo+" a donné "+payment.cost+"€ à "+payment.reciever.pseudo;
            var newDiv = document.createElement('div');
            document.getElementById('divDashboardGroup').appendChild(newDiv);

            newDiv.innerHTML = HTML;
        }

        // PAS TESTER
        calculateBalanceForOneBill= function(bill){
            var mailCurrentUser = sessionStorage.getItem('mail');
            var res = 0;
            if(bill.buyer.mail == mailCurrentUser){
                res += bill.buyer.cost;
            }
            for (var user of bill.users){
                if(user.mail == mailCurrentUser){
                    res -= user.cost;
                }
            }
            return res;
        }

        showHiddenDiv = function(div){
            div.childNodes[3].classList.toggle('ng-hide');
        }
    }
]);