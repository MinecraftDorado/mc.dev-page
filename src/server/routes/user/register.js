const express = require('express')
const router = express.Router()

// Showing register form 
router.get("/register", function (req, res) { 
    res.render("user/register"); 
}); 
  
// Handling user signup 
router.post("/register", function (req, res) { 
    var username = req.body.username 
    var password = req.body.password 
    User.register(new User({ username: username }), 
            password, function (err, user) { 
        if (err) { 
            console.log(err); 
            return res.render("user/register");  
        } 
  
        passport.authenticate("local")( 
            req, res, function () { 
              res.render("user/secret"); 
        }); 
    }); 
});

module.exports = router