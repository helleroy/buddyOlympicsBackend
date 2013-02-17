var Runners = require('./models/runners'),
passport = require('passport'),
LocalStrategy = require('passport-local').Strategy;

exports.login = function(req, res) {
	console.log('LOGIN: ' + req.user.username);
	res.send(req.user);
};

exports.logout = function(req, res) {
	console.log('LOGOUT: ' + req.user.username);
	req.logout();
	res.send(200);
};

exports.ensureAuthenticatedRunner = function(req, res, next) {
	var sessionUser = req.session.passport.user;
	if (sessionUser && sessionUser == req.params.id) return next(); 
	else return res.send(401);
};

exports.authenticate = passport.authenticate('local');

passport.serializeUser(function(user, done) {
	done(null, user.id);
});

passport.deserializeUser(function(id, done) {
	Runners.findById(id, function(err, user) {
		done(err, user);
	});
});

passport.use(new LocalStrategy(
	function(username, password, done) {
		Runners.findOne({ username: username }).populate('newruns').exec(function (err, runner) {
			if (err) { return done(err); }
			if (!runner) {
				return done(null, false, { message: 'Incorrect username.' });
			}
			if (!runner.validPassword(password)) {
				return done(null, false, { message: 'Incorrect password.' });
			}
			return done(null, runner);
		});
	})
);
