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
					allListTrades.push({'relationType':relation.type ,'relationName': relation.name ,'listTrade':relation.bills});
				}
				if(typeof relation.payments !== 'undefined' && relation.payments.length>0){
					allListTrades.push({'relationType':relation.type ,'relationName': relation.name ,'listTrade':relation.payments});
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
							newest = {'relationType':o.relationType,'relationName':o.relationName,'trade': tmp}
						}
					}
					i += 1;
				}

				listTradeSorted.push(newest);
				allListTrades[indiceOfNewestInListTrades].listTrade.pop();
			}
			//console.log("listTradeSorted:");
			//console.log(listTradeSorted);

		}




	}
]);