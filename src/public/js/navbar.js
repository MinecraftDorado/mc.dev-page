function showMenu(){

  var logo = document.getElementById("navbar")
  if(logo.className.includes("navbar-active")){
    logo.className = logo.className.replace("navbar-active", "navbar-disable")
  }else{
    logo.className = logo.className.replace("navbar-disable", "navbar-active")
  }
}