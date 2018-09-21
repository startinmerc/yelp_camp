var express = require("express"),
    router  = express.Router(),
    Campground = require("../models/campground"),
    middleware = require("../middleware");

/// INDEX Route
router.get('/', function(req,res){
    // Get all campgrounds from mongo:
    Campground.find({}, function(err, allCampgrounds){
        if(err){
        console.log(err);
        } else {
            // render as page, sourcing from DB instead of array in v1
            res.render('campgrounds/index', {campgrounds: allCampgrounds, page: "campgrounds"});
        }
    });
});

// NEW Route
router.get('/new',middleware.isLoggedIn, function(req,res){
    res.render('campgrounds/new');
});

// CREATE Route
router.post("/",middleware.isLoggedIn, function(req,res){
    // get data from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username: req.user.username
    };
    var price = req.body.price;
    var newCampground = {name: name, image: image, description:description, author:author, price: price};
    // create new CG & save to DB
    Campground.create(newCampground, function(err, newlyCreated){
        if(err){
            req.flash("error", "Something went wrong...");
            res.redirect('back');
        } else {
            req.flash("success", "Campground created!");
            res.redirect('campgrounds/');
        }
    });
    // redirect back to campgrounds page
});

// SHOW Route - put this AFTER /new, or will treat /new as a SHOW request
router.get("/:id", function(req,res){
    // find campground with provided ID
    Campground.findById(req.params.id).populate('comments').exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // console.log(foundCampground);
             // render show template with that campground
            res.render('campgrounds/show', {campground: foundCampground});
        }
    });
});

// EDIT campground route
router.get('/:id/edit',middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});
    });
});

// UPDATE campground route
router.put("/:id",middleware.checkCampgroundOwnership, function(req,res){
    // find and update correct campground
    Campground.findByIdAndUpdate(req.params.id, req.body.camp, function(err, updatedCampground){
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong...");
            res.redirect("/");
        } else {
            req.flash("success", "Campground edited");
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
    // redirect
});

// DESTROY route
router.delete("/:id",middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong...");
            res.redirect("/");
        } else {
            req.flash("success", "Campground deleted!");
            res.redirect("/campgrounds");
        }
    });
});

module.exports = router;