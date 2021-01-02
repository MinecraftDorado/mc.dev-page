const express = require('express')
const router = express.Router()

//Handling user logout  
router.get("/logout", function (req, res) { 
    req.logout(); 
    res.redirect("/"); 
});

module.exports = router