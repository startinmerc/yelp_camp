var express = require("express"),
    router  = express.Router(),
    passport = require("passport"),
    User = require("../models/user");
    
// =================================REDIRECTS===================================

// REDIRECT to INDEX
router.get('/', function(req,res){
    res.render('landing');
});

// ===========AUTH ROUTES=======================================================

// GET register form
router.get("/register", function(req, res) {
    res.render("register");
});
// POST user signup
router.post("/register", function(req, res) {
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err,user){
        if(err){
            req.flash("error", err.message);
            return res.redirect("register");
        }
        passport.authenticate("local")(req,res,function(){
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect('/campgrounds');
        });
    });
});
// GET login form
router.get("/login", function(req, res) {
   res.render("login"); 
});
// POST login logic
router.post("/login", passport.authenticate("local",
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
        
    }), function(req, res) {
});
// GET logout request
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Logged out!");
    res.redirect("back");
});

module.exports = router;