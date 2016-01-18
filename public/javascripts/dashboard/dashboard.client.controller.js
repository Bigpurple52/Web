angular.module('dashboard').controller('DashboardCtrl', [
	'$scope',
	'dashboard',
	function($scope, dashboard) {
		$scope.dashboard= dashboard.dashboard;
	}
]);