var express    = require("express"),
	app        = express(),
	bodyparser = require("body-parser"),
	mongoose   = require("mongoose"),
	passport   = require("passport"),
	flash	   = require("connect-flash"),	
	LocalStrategy = require("passport-local"),
	User      = require("./models/user"),
	// seedDB     = require("./seeds"),
	methodOverride = require("method-override");
//requiring routes	
	var	authRoutes       = require("./routes/index");

//seed the database
// seedDB();

mongoose.connect("mongodb://localhost:27017/Game_Theory", { useNewUrlParser: true }); 
// mongoose.connect("mongodb://ashish:ashkush21@ds119090.mlab.com:19090/yelpcamp", { useNewUrlParser: true });
app.use(bodyparser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));  
app.use(flash());	


//PASSPORt config
app.use(require("express-session")({
	secret: "best car lamborghini gallardo",
	resave: false,
	saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
	res.locals.currentUser = req.user;
	res.locals.error	= req.flash("error");
	res.locals.success	= req.flash("success");
	next();	
});

app.use("/", authRoutes);

// app.listen(process.env.PORT, process.env.IP);
app.listen(5000, function(){
	console.log("server has started");
});