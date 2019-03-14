var express = require("express");
var router = express.Router();
var passport = require("passport");
var User  = require("../models/user");
var Rounds = require("../models/rounds");


//root route
router.get("/", function(req, res){
	res.render("index");
});



//show register form
router.get("/register", function(req, res){
	res.render("register");
});

//handle signup route
router.post("/register", function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash("error", err.message);
			return res.redirect("/register");
		}
			passport.authenticate("local")(req, res, function(){
			req.flash("success", "Successfully signed up. Welcome " + user.username);	
			if(newUser.isAdmin)
				res.render("adminView", {currentUser: user});
			else
				res.render("participantView", {currentUser: user}); 
		});
	});
});
//login route
router.get("/login", function(req, res){
	res.render("login");
});

router.get("/view", function(req, res){
	if(req.user.isAdmin)
		res.render("adminView");
	else
		res.render("participantView");
});

//login logic
router.post("/login",passport.authenticate("local",
	{
		successRedirect: "/view",
		failureRedirect: "/login",
		failureFlash: true
	}), function(req, res){
});


//logout route
router.get("/logout", function(req, res){
	req.logout();
	req.flash("success", "Logged you out!");
	res.redirect("/");
}); 


//Round routes

//round info fetch
router.post("/roundInfo", function(req, res){
	var typeA = Number(req.body.typeA);
	var	typeB = Number(req.body.typeB);
	var	typeC = Number(req.body.typeC);
	var	factorA = Number(req.body.factorA);
	var	factorB = Number(req.body.factorB);
	var	factorC = Number(req.body.factorC);
	var round  = Number(req.body.round);
	User.update({username: "Ash"}, {$set: {presentRound: round}});
    var newRound = {typeA:typeA, typeB:typeB, typeC:typeC, factorA:factorA, factorB:factorB, factorC:factorC, roundNumber: round}
    Rounds.create(newRound, function(err, newlycreated){
    	if(err){
    		console.log(err);
    	}
    	else{
    	if(req.user.isAdmin)
    		res.render("adminView");
    	else
    		res.render("participantView");	
    	}
    	
    });	
});

//add points of participant from participant view
router.post("/insertPoints", function(req, res){
	//var = 
});



module.exports = router;