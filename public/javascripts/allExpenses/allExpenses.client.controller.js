angular.module('allExpenses').controller('AllExpensesCtrl', [
	'$scope',
	'allExpenses',
	function($scope, allExpenses) {
		$scope.allExpenses= allExpenses.allExpenses;

		$scope.init= function(){
			$scope.createListSorted();
		}
	

		$scope.createListSorted= function(){
			var allRelation = $scope.allExpenses;
			var allListTrades = [];
			var listTradeSorted = [];

			//console.log("allExpenses:");
			//console.log(allExpenses);

			for(var relation of allRelation){
				if(typeof relation.bills !== 'undefined' && relation.bills.length>0){
					allListTrades.push({'relation': relation,'listTrade':relation.bills});
				}
				if(typeof relation.payments !== 'undefined' && relation.payments.length>0){
					allListTrades.push({'relation':relation,'listTrade':relation.payments});
				}
			}

			//console.log("allListTrades:");
			//console.log(allListTrades);

			var AllIsEmpty = function(){
				for(var o of allListTrades){
					if(o.listTrade.length != 0){
						return false;
					}
				}
				return true;
			}

			while(!AllIsEmpty()){
				var indiceOfNewestInListTrades = 0;
				var newest;
				var newestDate = new Date(0);

				var i =0;
				for(var o of allListTrades){
					if(o.listTrade.length != 0){
						var tmp = o.listTrade[o.listTrade.length-1];
						var tmpDate = new Date(tmp.date);
						if(tmpDate.getTime() > newestDate.getTime()){
							indiceOfNewestInListTrades = i;
							newestDate = tmpDate;
							newest = {'relation':o.relation,'trade': tmp}
						}
					}
					i += 1;
				}

				listTradeSorted.push(newest);
				allListTrades[indiceOfNewestInListTrades].listTrade.pop();
			}
			//console.log("listTradeSorted:");
			//console.log(listTradeSorted);

			$scope.listHistorique = listTradeSorted;
			$scope.DisplayHistorique();

		}

		$scope.toDateString= function(date){
            var d = new Date(date)
            return d.toDateString();
        }

		$scope.DisplayHistorique= function(){
            var list = $scope.listHistorique;
            if(typeof list !== 'undefined' && list.length>0){
                for (var o of list){
                    DisplayObjectHTML(o.relation,o.trade);
                }
            }
        }

		DisplayObjectHTML= function(relation,trade){
            if(typeof trade.giver !== 'undefined' ){
                DisplayPaymentHTML(relation,trade);
                
            }else{
                DisplayBillHTML(relation,trade);
            }
        }

        DisplayBillHTML = function(relation,bill){
            var HTML = "";
            HTML+="<span class=\"glyphicon glyphicon-list-alt\"></span>    ";
            HTML+=$scope.toDateString(bill.date)+"  "+ bill.descript +" : "+bill.buyer.pseudo+" a payé "+ bill.buyer.cost+ "€";
            if(relation.type =='GROUP'){
            	HTML +=" dans le groupe \""+relation.name+"\"";
            }
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

            HTML+="<div class=\"ng-hide info\">";
            for (var user of bill.users){
                HTML+= user.pseudo +" doit "+ user.cost+"€ <br/>";
            }
            HTML+="<button class=\"btn\" onClick=\"\">Suppression </button>";
            HTML+="</div>";

            var newDiv = document.createElement('div');
            newDiv.setAttribute("onClick","showHiddenDiv(this)");
            document.getElementById('divDashboardGroup').appendChild(newDiv);

            newDiv.innerHTML = HTML;

        }

        DisplayPaymentHTML= function(relation,payment){
            var HTML = "";
            HTML+="<span class=\"glyphicon glyphicon-eur\"></span>    ";
            HTML+=$scope.toDateString(payment.date)+" Remboursement: "+payment.giver.pseudo+" a donné "+payment.cost+"€ à "+payment.reciever.pseudo;
            if(relation.type =='GROUP'){
            	HTML +=" dans le groupe \""+relation.name+"\"";
            }

            HTML+="<div class=\"ng-hide info\">";
            HTML+="Description: "+payment.descript+ "<br/>";
            HTML+= payment.giver.pseudo+" a donné "+payment.cost+"€ <br/>";
            HTML+= payment.reciever.pseudo+" a recu "+payment.cost+"€ <br/>";
            HTML+="</div>";


            var newDiv = document.createElement('div');
            newDiv.setAttribute("onClick","showHiddenDiv(this)");
            document.getElementById('divDashboardGroup').appendChild(newDiv);

            newDiv.innerHTML = HTML;
        }

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
            for(var i=0; i<div.childNodes.length;i++){
                console.log(i);
                if(typeof div.childNodes[i].classList !== 'undefined' ){
                    for(var j=0; j< div.childNodes[i].classList.length; j++){
                        if(div.childNodes[i].classList[j] == 'info'){
                            div.childNodes[i].classList.toggle('ng-hide');
                        }
                    } 
                }
            }
        }

	}
]);