var Runners = require('../models/runners'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

exports.login = function(req, res) {
	console.log('LOGIN: ' + req.user);
	res.send(200);
};

exports.logout = function(req, res) {
	req.logout();
	res.send(200);
};

exports.authenticate = passport.authenticate('local', {session : false});

passport.use(new LocalStrategy(
	function(username, password, done) {
		console.log('Jødar var her');
		Runners.findOne({username : username}, function(err, runner) {
			console.log('Jødar var også her inne');
			if (err) { 
				console.log('Server error.');
				return done(err);
			}
			if (!runner) {
				console.log('Incorrect username.');
				return done(null, false, {message : 'Incorrect username.'});
			}
			if (!runner.validPassword(password)) {
				console.log('Incorrect password.');
				return done(null, false, {message : 'Incorrect password.'})
			}
			console.log('Jødar er glad: ' + runner);
			return (null, runner);
		});
	}
	));
