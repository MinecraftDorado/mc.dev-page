<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BlackMarket - Wiki</title>
    <link rel="stylesheet" href="css/styles.css?v=<?php echo time(); ?>" />
    <link rel="stylesheet" href="css/content-page.css?v=<?php echo time(); ?>" />
    <link rel="icon" href="images/bm_icon.png">
    <script type="text/javascript" src="js/spoiler.js"></script>
    <script type="text/javascript" src="js/navbar.js"></script>
</head>
<body>
    <nav class="navbar navbar-disable" id="navbar">
        <ul class="navbar-nav">
            <li class="logo"><a class="nav-link"><img src="images/menu.png" class="navbar-icon" onclick="showMenu()"></a></li>
            <li class="nav-item"><a class="nav-link" href="https://github.com/MinecraftDorado" target="_blank">GitHub</img></a></li>
            <li class="nav-item"><a class="nav-link"  href="https://discord.gg/gBd9SYUHba" target="_blank">Support</a></li>
            <li class="nav-item"><a class="nav-link" href="https://paypal.me/minecraftdorado?locale.x=es_XC" target="_blank">Donate</a></li>
        </ul>
    </nav>

    <div id="title">
        <img src="images/bm_icon.png" alt="icon">
        <h1>BlackMarket</h1>
        <h2>BlackMarket allows you to offer your items for a certain time, after it is, the item will be returned to you if no one bought it. It is fully customizable.</h2>
    </div>

    <div class="col_border">.</div>
    <div class="col_center">
        <a href="index">« All posts</a>
        <div class="content">
            <a id="date"><script>
                var date = new Date(document.lastModified)
    
                date = (date.getMonth()+1) + " - " + date.getDate() + " - " + date.getFullYear()
    
                console.log(date)
    
                document.getElementById("date").textContent = date
            </script></a>
            <h2>Random Text For Title</h2>
            <p>Ideo sumi sae ima ente rari novi. Contrariae aliquoties affirmabam parentibus ad deprehendi mo. Ac nunc illi ii fide. Judicio finitae invenio eam claudam fuerunt sed vel majoris. Enitar fingam scioli ut latera im habens ac me. Apud viam ex quem visu ne. Debent fronte moveri videre ab statim im is posset. Vim quidem cupere ausint nolens tur cap omnino. </p>

            <img src="images/img.png" alt="img">

            <h2>Random Text For Title</h2>
            <p>Ideo sumi sae ima ente rari novi. Contrariae aliquoties affirmabam parentibus ad deprehendi mo. Ac nunc illi ii fide. Judicio finitae invenio eam claudam fuerunt sed vel majoris. Enitar fingam scioli ut latera im habens ac me. Apud viam ex quem visu ne. Debent fronte moveri videre ab statim im is posset. Vim quidem cupere ausint nolens tur cap omnino. </p>
            
            <desc>Description or comment</desc>
            

            <a href="#">#HashTag</a>

            <i>Italic</i>

            <code>Permission</code>

            <pre><code>Code area</code></pre>

            <button type="button" onclick="show('spoiler-code')" class="spoiler">Show code</button>
            <pre><code id="spoiler-code" style="display: none;">Code area</code></pre>
        </div>
    </div>
    <a class="col_border">.</a>
</body>
</html>