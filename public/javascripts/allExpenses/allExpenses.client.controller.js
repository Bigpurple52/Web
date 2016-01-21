angular.module('allExpenses').controller('AllExpensesCtrl', [
	'$scope',
	'allExpenses',
	function($scope, allExpenses) {
		$scope.allExpenses= allExpenses.allExpenses;
	}
]);