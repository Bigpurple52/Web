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
            HTML+=$scope.toDateString(bill.date)+"  "+ bill.descript +" : "+bill.buyer.pseudo+" a payé "+ bill.buyer.cost+ "€ <button class=\"btn\">Edition</button>";//+ajoutFormEditBill();


            var newDiv = document.createElement('div');
            document.getElementById('divDashboardGroup').appendChild(newDiv);

            newDiv.innerHTML = HTML;
        }

        DisplayPaymentHTML= function(payment){
            var HTML = "";
            HTML+="<span class=\"glyphicon glyphicon-eur\"></span>    ";
            HTML+=$scope.toDateString(payment.date)+"  "+payment.descript+" : "+payment.giver.pseudo+" a donné "+payment.cost+"€ à "+payment.reciever.pseudo+"<button onClick=\"testAff("+payment+")\" class=\"btn\">Edition</button>";//+ajoutFormEditBill();
            var newDiv = document.createElement('div');
            document.getElementById('divDashboardGroup').appendChild(newDiv);

            newDiv.innerHTML = HTML;
        }

        // PAS TESTER
        calculateBalanceForOneBill= function(bill,user){
            var res = 0;
            if(bill.buyer.mail == user.mail){
                res += bill.buyer.cost;
            }
            for (var userB of bill.users){
                if(userB.mail == user.mail){
                    res -= userB.cost;
                }
            }
        }

        ajoutFormEditBill = function(){
            var res="";
            res+=   "<form name=\"editBillForm\" role=\"form\" novalidate>";
            res+=       "<div class=\"form-friend\" ng-class=\"{'has-error': editBillForm.descriptbill.$invalid && editBillForm.descriptbill.$dirty, 'has-success': editBillForm.descriptbill.$valid}\">";
            res+=           "<label for=\"descriptbill\">Description:</label>";
            res+=               "<input type=\"text\" class=\"form-control\" name=\"descriptbill\" placeholder=\"Description\" ng-model=\"descriptbill\" required ng-minlength=\"1\" ng-maxlength=\"250\">";
            res+=                   "<span class=\"error\" ng-show=\"editBillForm.descriptbill.$error.required && newBillForm.descriptbill.$dirty\">Ce champ doit être rempli</span>";
            res+=                   "<span class=\"error\" ng-show=\"editBillForm.descriptbill.$error.maxlength\">Description trop long (Maximum 250 caractères)</span>";
            res+=               "</input>";
            res+=       "</div>";
            res+=       "<div class=\"form-friend\" ng-class=\"{'has-error': editBillForm.montantbill.$invalid && editBillForm.montantbill.$dirty, 'has-success': editBillForm.montantbill.$valid}\">";
            res+=           "<label for=\"montantbill\">Montant:</label>";
            res+=               "<input type=\"number\" class=\"form-control\" name=\"montantbill\" placeholder=\"Montant\" ng-model=\"montantbill\" required>";
            res+=                   "<span class=\"error\" ng-show=\"editBillForm.montantbill.$error.required && editBillForm.montantbill.$dirty\">Ce champ doit être rempli</span>";
            res+=               "</input>";
            res+=       "</div>";
            res+=       "<div class=\"form-friend\" ng-class=\"{'has-error': editBillForm.buyerbill.$invalid && editBillForm.buyerbill.$dirty, 'has-success': editBillForm.buyerbill.$valid}\">";
            res+=           "<label for=\"buyerbill\">Celui qui paye: </label>";
            res+=               "<select class=form-control ng-model=\"buyerbill\" ng-options=\"user as user.pseudo for user in friend.users track by user._id\">";
            res+=               "</select>";
            res+=       "</div>";
            res+=       "<div class=\"form-friend\" ng-class=\"{'has-error': editBillForm.ownerbill.$invalid && editBillForm.ownerbill.$dirty, 'has-success': editBillForm.ownerbill.$valid}\">";
            res+=           "<label for=\"ownerbill\">Ceux qui sont inclus: </label>";
            res+=               "<select multiple class=form-control ng-model=\"ownerbill\" ng-options=\"user as user.pseudo for user in friend.users track by user._id\">";
            res+=               "</select>";
            res+=       "</div>";
            res+=       "<button class=\"btn btn-primary\" ng-disabled=\"editBillForm.$invalid\">Editer</button>";
            res+=       "<button class=\"btn btn-warning\">Annuler</button>";
            res+=   "</form>";
            return res;
        }

        testAff = function(param){
            alert("le paramètre est : " + param);
        }

    }

]);