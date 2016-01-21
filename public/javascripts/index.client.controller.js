function loadSession(){
  if(sessionStorage.getItem('id') != null){
    document.getElementById("getPseudo").innerHTML = sessionStorage.getItem('pseudo')+" ";
    document.getElementById("hideConnected").classList.add('ng-hide');
    document.getElementById("hideNotConnected").classList.remove('ng-hide');
  }else if(document.location.href!="http://localhost:3000/#/register"){
    document.location.href = "http://localhost:3000/#/connection";
    document.getElementById("hideConnected").classList.remove('ng-hide');
    document.getElementById("hideNotConnected").classList.add('ng-hide');
  }
};

function userProfile(){
  document.location.href = "#/userProfile/"+sessionStorage.getItem('id');
}

function deleteSession(){
  sessionStorage.clear();
  alert('Deconnexion réussie !');
  document.location.href = "/"
}