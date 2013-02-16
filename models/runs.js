var mongoose = require('mongoose'),
ObjectId = mongoose.Schema.Types.ObjectId;

var runSchema = mongoose.Schema({
	starttime : Date,
	type : {
		time : Number,
		distance : Number,
		avgspeed : Number,
		topspeed : Number
	},
	participants : [{
		runner : ObjectId,
		time : Number,
		distance : Number,
		owner : Boolean,
		finished : Boolean,
		coordinates : [{
			longitude : Number,
			latitude : Number,
			timestamp : Number
		}]
	}],
	finished : Boolean,
	winner : ObjectId
});

runSchema.statics.findAll = function(cb) {
	this.find({}, cb);
};

module.exports = mongoose.model('Run', runSchema);
