const express = require('express')
const router = express.Router()

// Showing secret page 
router.get("/secret", isLoggedIn, function (req, res) {
    res.render("user/secret");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) return next();
    res.redirect("/login");
}

module.exports = router