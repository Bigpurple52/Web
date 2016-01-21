DisplayTradeHTML= function(relation,trade){
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
    HTML+="<a href=\"#/edit/bill/"+relation._id+"/"+bill.identifier+"\"><button class=\"btn\" onClick=\"\">Edit </button></a>";
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
		HTML+="<a href=\"#/edit/payment/"+relation._id+"/"+payment.identifier+"\"><button class=\"btn\" onClick=\"\">Edit </button></a>";
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

toDateString= function(date){
    var d = new Date(date)
    return d.toDateString();
}
