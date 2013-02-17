/*
Copyright (c) 2013 Henrik Hellerøy, https://github.com/helleroy/
Licensed under the MIT license, http://opensource.org/licenses/MIT
*/

var Runs = require('../models/runs');

exports.findAll = function(req, res) {
	Runs.findAll(function(err, runs) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			console.log('GET RUNS: ' + runs);
			res.send(runs);
		}
	});
};

exports.findById = function(req, res) {
	Runs.findById(req.params.id, function(err, run) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			console.log('GET RUN: ' + run);
			res.send(run);
		}
	});
};

exports.addRun = function(req, res) {
	var run = new Runs(req.body);
	run.save(function(err) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			console.log('POST RUN: ' + run);
			res.send(200);
		}
	});
};

exports.updateRun = function(req, res) {
	Runs.findOneAndUpdate({_id : req.params.id}, req.body, function(err, run) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			console.log('PUT RUN: ' + run);
			res.send(200);
		}
	});
};

exports.acceptRun = function(req, res) {
	Runs.update({_id : req.params.runId, 'participants.runner' : req.params.id}, 
		{$set : {'participants.$.accept' : true}}, function(err) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			console.log('PUT RUN ACCEPT');
			res.send(200);
		}
	});
};

exports.pushCoords = function(req, res) {
	Runs.update({_id : req.params.runid, 'participants.runner' : req.params.id}, 
		{$push : {'participants.$.coordinates' : req.body.coordinates }}, function(err) {
			if (err) {
				console.log(err);
				res.send(500);
			} else {
				console.log('PUT RUN COORDS');
				res.send(200);
			}
	});
};

exports.deleteRun = function(req, res) {
	Runs.findOneAndRemove({_id : req.params.id}, function(err, run) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			console.log('DELETE RUN: ' + run);
			res.send(200);
		}
	});
};
