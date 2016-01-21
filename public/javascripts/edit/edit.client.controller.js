//friend controller
angular.module('edit').controller('EditCtrl', [
    '$scope',
    'edit',
	function($scope, edit) {
    $scope.group = edit.groupbillpayment.group;
  	$scope.billInit = edit.groupbillpayment.bill;
  	$scope.paymentInit = edit.groupbillpayment.payment;
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
            $scope.descriptpayment = $scope.paymentInit.descript;
            $scope.montantpayment = $scope.paymentInit.cost;
            $scope.giverpayment = $scope.paymentInit.giver;
            $scope.recieverpayment = $scope.paymentInit.reciever;
            $scope.selectGiver();
        }
      }

      $scope.selectGiver= function(){
        console.log("selectGiver");
        console.log($scope.giverpayment);
        var listReciev=[];
        for(user of $scope.group.users){
          if(user.mail != $scope.giverpayment.mail){
            listReciev.push(user);
          }
        }
        $scope.listReciever=listReciev;
      }

      $scope.EditBill = function(){
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
          if($scope.group.type=="FRIEND"){
            document.location.href='#/friend/'+$scope.group._id;
          }else if($scope.group.type=="GROUP"){
            document.location.href='#/group/'+$scope.group._id;
          }
        });
      }

      $scope.EditPayment = function(){
        console.log("début édit payment");
        if (!$scope.group._id || !$scope.descriptpayment || !$scope.montantpayment || !$scope.giverpayment || !$scope.recieverpayment) {
            return;
        }
        var identifier = $scope.paymentInit.identifier;
        var tmpGroupId = $scope.group._id;
        var tmpGiver = $scope.giverpayment;
        var tmpDescript = $scope.descriptpayment;
        var tmpCost = $scope.montantpayment;
        var tmpReciever = $scope.recieverpayment;
        $scope.descriptpayment="";
        $scope.montantpayment="";
        $scope.giverpayment="";
        $scope.recieverpayment="";

        edit.editPayment({
          identifier: identifier,
          typebp : "payment",
          groupeid : tmpGroupId,
          giver : tmpGiver,
          date : $scope.paymentInit.date,
          descript :tmpDescript ,
          cost : tmpCost,
          reciever : tmpReciever,
        }, function(data){
          alert("Modification effectuée");
          if($scope.group.type=="FRIEND"){
            document.location.href='#/friend/'+$scope.group._id;
          }else if($scope.group.type=="GROUP"){
            document.location.href='#/group/'+$scope.group._id;
          }
        });
      }

      $scope.AnnulerEdit= function(){
        if($scope.group.type=="FRIEND"){
          document.location.href='#/friend/'+$scope.group._id;
        }else if($scope.group.type=="GROUP"){
          document.location.href='#/group/'+$scope.group._id;
        }
      }

    }
]);
