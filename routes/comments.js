var express = require("express"),
    router  = express.Router({mergeParams:true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleware = require("../middleware");
    
// CREATE Route
router.get('/new', middleware.isLoggedIn, function(req,res){
    // find capground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
        } else {
                res.render('comments/new', {campground: campground});
        }
    });
});

// POST Route
router.post('/', middleware.isLoggedIn, function(req,res){
    // look up campground by id
    Campground.findById(req.params.id, function(err, campground){
        if(err){
            console.log(err);
            req.flash("error", "Something went wrong...");
            res.redirect("/campgrounds");
        } else {
            // create new comment
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else {
                    // add username & id to comment
                    comment.author.id       = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // connect new comment to campground
                    campground.comments.push(comment);
                    campground.save();
                    // redirect to show page
                    req.flash("success", "Comment posted!");
                    res.redirect('/campgrounds/' + campground._id);
                }
            });
        }
    });
});

// GET edit page
router.get("/:comment_id/edit",middleware.checkCommentOwnership , function(req,res){
    Comment.findById(req.params.comment_id, function(err, foundComment){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            res.render("comments/edit", {campground_id:req.params.id, comment:foundComment});    
        }
    });
});

// PUT updated comment
router.put("/:comment_id", function(req,res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if(err){
            res.redirect('back');
        } else {
            req.flash("success", "Comment updated")
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

// DELETE comment
router.delete("/:comment_id",middleware.checkCommentOwnership , function(req,res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err){
        if(err){
            console.log(err);
            res.redirect('back');
        } else {
            req.flash("success", "Comment deleted")
            res.redirect('/campgrounds/' + req.params.id);
        }
    });
});

module.exports = router;