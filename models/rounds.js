var mongoose  = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var RoundsSchema = new mongoose.Schema({
	round : Number,
	typeA: Number,
	typeB: Number,
	typeC: Number,
	factorA: Number,
	factorB: Number,
	factorC: Number,
	roundNumber: Number,
	points: [{
		id:{ type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		points: Number

	}]
});

RoundsSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Rounds", RoundsSchema);