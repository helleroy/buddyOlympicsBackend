var Runners = require('../models/runners');

exports.findAll = function(req, res) {
	Runners.findAll(function(err, runners) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			console.log('GET RUNNERS: ' + runners);
			res.send(runners);
		}
	});
};

exports.findById = function(req, res) {
	Runners.findOneNoPw({_id : req.params.id}, function(err, runner) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			console.log('GET RUNNER: ' + runner);
			res.send(runner);
		}
	});
};

exports.addRunner = function(req, res) {
	var runner = new Runners(req.body);
	runner.save(function(err) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			console.log('POST RUNNER: ' + runner);
			res.send(200);
		}
	});
};

exports.updateRunner = function(req, res) {
	Runners.findOneAndUpdate({_id : req.params.id}, req.body, function(err, runner) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			console.log('PUT RUNNER: ' + runner);
			res.send(200);
		}
	});
};

exports.deleteRunner = function(req, res) {
	Runners.findOneAndRemove({_id : req.params.id}, function(err, runner) {
		if (err) {
			console.log(err);
			res.send(500);
		} else {
			console.log('DELETE RUNNER: ' + runner);
			res.send(200);
		}
	});
};
