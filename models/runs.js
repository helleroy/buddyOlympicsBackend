/*
Copyright (c) 2013 Henrik Hellerøy, https://github.com/helleroy/
Licensed under the MIT license, http://opensource.org/licenses/MIT
*/

var mongoose = require('mongoose'),
Runners = require('../models/runners'),
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
		runner : {type : ObjectId, ref : 'Runner'},
		time : Number,
		distance : Number,
		accept : Boolean,
		owner : Boolean,
		finished : Boolean,
		coordinates : [{
			longitude : Number,
			latitude : Number,
			timestamp : Number
		}]
	}],
	finished : Boolean,
	winner : {type : ObjectId, ref : 'Runner'}
});

runSchema.statics.findAll = function(cb) {
	this.find({}, cb);
};

runSchema.post('save', function(doc) {
	var participants = doc.participants;
	var runId = doc._id;
	participants.forEach(function(p) {
		Runners.findById(runnerId, function(err, runner){
			runner.newruns.push(runId);
			runner.save(function(err, runner) {
				console.log('PUT RUN IN RUNNER QUEUE: ' + runner);
			});
		});
	});
});

module.exports = mongoose.model('Run', runSchema);
