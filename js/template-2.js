var title = document.getElementById("title")

title.innerHTML = title.innerHTML + '<img src="../images/bm_icon.png" alt="icon"><h1>BlackMarket</h1><h2>BlackMarket allows you to offer your items for a certain time, after it is, the item will be returned to you if no one bought it. It is fully customizable.</h2>'

var navbar = document.getElementById("navbar")

navbar.innerHTML = navbar.innerHTML + '<ul class="navbar-nav"><li class="logo"><a class="nav-link"><img src="../images/menu.png" class="navbar-icon" onclick="showMenu()"></a></li><li class="nav-item"><a class="nav-link" href="https://github.com/MinecraftDorado" target="_blank">GitHub</img></a></li><li class="nav-item"><a class="nav-link"  href="https://discord.gg/gBd9SYUHba" target="_blank">Support</a></li><li class="nav-item"><a class="nav-link" href="https://paypal.me/minecraftdorado?locale.x=es_XC" target="_blank">Donate</a></li></ul>'

if(document.getElementById("date") != null){
  var d = document.getElementById("date")

  var date = new Date(document.lastModified)
  date = (date.getMonth()+1) + " - " + date.getDate() + " - " + date.getFullYear()
  d.textContent = date
}