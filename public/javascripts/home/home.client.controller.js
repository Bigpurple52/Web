//home controller
angular.module('home').controller('HomeCtrl', [
    '$scope',
    'home',
    function($scope, home) {
        $scope.home = home.home;
        
        $scope.init = function(){
	        if(!sessionStorage.getItem('id')){
	        	document.location.href='#/connection';
	        }
            $scope.getGroups(function(){
                $scope.getFriends(function(){
                    $scope.calculateBalance();        
                });    
            });
            
            
   	 	}

        $scope.getGroups=function (callback){
            home.getGroups(sessionStorage.getItem('mail'),function (data){
            $scope.listGroups = data;
            callback();
            });
        }

        $scope.getFriends=function(callback){
            home.getFriends(sessionStorage.getItem('mail'),function (data){
            $scope.listFriends = data;
            callback();
            });
        }

        $scope.calculateBalance = function(){
            var youOwe = 0;
            var youAreOwned = 0;

            var listFriends = $scope.listFriends;
            var listGroups = $scope.listGroups;

            var listYouOwe = [];
            var listYouAreOwned = [];

            if(typeof listGroups !== 'undefined' && listGroups.length>0){
                for(var group of listGroups){
                    var tmp = $scope.calculateMyBalance(group);
                    if(tmp<0){
                        youOwe -= tmp;
                        listYouOwe.push({'relation': group, 'cost' : tmp});
                    }else{
                        youAreOwned += tmp; 
                        if(tmp != 0){
                            listYouAreOwned.push({'relation': group, 'cost' : tmp});
                        }   
                    }
                }
            }
            
            if(typeof listFriends !== 'undefined' && listFriends.length>0){
                for(var friend of listFriends){
                    var tmp = $scope.calculateMyBalance(friend);
                    if(tmp<0){
                        youOwe -= tmp;
                        listYouOwe.push({'relation': friend, 'cost' : tmp});
                    }else{
                        youAreOwned += tmp;
                        if(tmp != 0){
                         listYouAreOwned.push({'relation': friend, 'cost' : tmp});
                        }   
                    }
                }
            }
            $scope.listYouAreOwned =listYouAreOwned;
            $scope.listYouOwe = listYouOwe;

            $scope.youOwe = youOwe;
            $scope.youAreOwned = youAreOwned;
            $scope.totalBalance = youAreOwned - youOwe;

        }        


        $scope.calculateMyBalance = function(group){

            var res = 0;
            var mailCurrentUser = sessionStorage.getItem('mail');

            if(typeof group.bills !== 'undefined' && group.bills.length>0){
                for (var bill of group.bills){
                    if(bill.buyer.mail == mailCurrentUser){
                        res += bill.buyer.cost;
                    }
                    for (var user of bill.users){
                        if( user.mail== mailCurrentUser){
                            res -= user.cost;
                        }
                    }
                }
            }

            if(typeof group.payments !== 'undefined' && group.payments.length>0){
                for (var payment of group.payments){
                    if(payment.giver.mail == mailCurrentUser){
                        res += payment.cost;
                    }
                    if(payment.reciever.mail == mailCurrentUser){
                        res -= payment.cost;
                    }
                }
            }

            return res;
        }

        $scope.DisplayYouAreOwned = function(d){
            var relation = d.relation;
            var cost = d.cost;
            if(relation.type == 'FRIEND'){
                for (var user of relation.users){
                    if(user.mail != sessionStorage.getItem('mail')){
                        return "Ton ami(e) "+user.pseudo+" te doit "+ cost+"€";
                    }
                }
            }
            if(relation.type == 'GROUP'){
                return "Le groupe \""+relation.name+"\" te doit "+ cost+"€";
            }
        }

        $scope.DisplayYouOwe = function(d){
            var relation = d.relation;
            var cost = d.cost;
            if(relation.type == 'FRIEND'){
                for (var user of relation.users){
                    if(user.mail != sessionStorage.getItem('mail')){
                        return "Tu dois "+(-1) *cost+"€ à ton ami(e) "+user.pseudo;
                    }
                }
            }
            if(relation.type == 'GROUP'){
                return "Tu dois "+ (-1) *cost+"€ dans le groupe " + "\""+relation.name+"\"";
            }
        }

    }
]);