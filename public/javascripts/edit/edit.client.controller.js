//friend controller
angular.module('edit').controller('EditCtrl', [
    '$scope',
    'edit',
	function($scope, edit) {
    $scope.group = edit.groupbillpayment.group;
  	$scope.billInit = edit.groupbillpayment.bill;
  	$scope.billModif;
  	$scope.paymentInit = edit.groupbillpayment.payment;
  	$scope.paymentModif;
    $scope.balance = new Map();
    $scope.listReciever;


      $scope.init = function(){
        if(typeof $scope.billInit != 'undefined'){
          $scope.descriptbill = $scope.billInit.descript;
          $scope.montantbill = $scope.billInit.buyer.cost;
          $scope.buyerbill = $scope.billInit.buyer;
          $scope.ownerbill = $scope.billInit.users;
        }

        if(typeof $scope.paymentInit != 'undefined'){

        }
      }

      $scope.selectGiver= function(){
        /*console.log($scope.buyerbill);
        $scope.giverpayment=null;
        var listReciev=[];
        for(user of $scope.group.users){
          if(user.mail != $scope.buyerbill.mail){
            listReciev.push(user);
          }
        }
        $scope.listReciever=listReciev;*/
      }

      $scope.EditBillFriend = function(){
        if (!$scope.group._id || !$scope.descriptbill || !$scope.montantbill || !$scope.buyerbill || !$scope.ownerbill) {
            return;
        }
        var identifier = $scope.billInit.identifier;
        var tmpGroupId = $scope.group._id;
        var tmpBuyer = $scope.buyerbill;
        var tmpDescript = $scope.descriptbill;
        var tmpCost = $scope.montantbill;
        var tmpUsers = $scope.ownerbill;
        $scope.descriptbill="";
        $scope.montantbill="";
        $scope.buyerbill="";
        $scope.ownerbill="";

        edit.editBill({
          identifier: identifier,
          typebp : "bill",
          groupeid : tmpGroupId,
          buyer : tmpBuyer,
          date : $scope.billInit.date,
          descript :tmpDescript ,
          cost : tmpCost,
          users : tmpUsers
        }, function(data){
          alert("Modification effectuée");
            document.location.href='#/friend/'+$scope.group._id;
        });
      }

    }
]);
