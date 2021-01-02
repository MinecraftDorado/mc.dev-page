const express = require('express')
const router = express.Router()
var passport = require("passport")

//Showing login form 
router.get("/login", function (req, res) { 
    res.render("user/login"); 
}); 
  
//Handling user login 
router.post("/login", passport.authenticate("local", { 
    successRedirect: "/secret",
    failureRedirect: "/login"
}), function (req, res) { 
}); 
  
//Handling user logout  
router.get("/logout", function (req, res) { 
    req.logout(); 
    res.redirect("/"); 
}); 

module.exports = router