/*
Copyright (c) 2013 Henrik Hellerøy, https://github.com/helleroy/
Licensed under the MIT license, http://opensource.org/licenses/MIT
*/

var express = require('express'),
mongoose = require('mongoose'),
passport = require('passport'),
runners = require('./routes/runners'),
runs = require('./routes/runs'),
auth = require('./authentication');

var app = express();

mongoose.connect(process.env.BUDDYMONGO || 'mongodb://localhost/buddyolympics');

app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.cookieParser());
	app.use(express.session({ secret: 'hattifnatt' }));
	app.use(passport.initialize());
	app.use(passport.session());
});

app.get('/runners', runners.findAll);
app.get('/runners/:id', runners.findById);
app.post('/runners', runners.addRunner);
app.put('/runners/:id', auth.ensureAuthenticatedRunner, runners.updateRunner);
app.delete('/runners/:id', auth.ensureAuthenticatedRunner, runners.deleteRunner);

app.get('/runs', runs.findAll);
app.get('/runs/:id', runs.findById);
app.post('/runs', runs.addRun);
app.put('/runs/:id', runs.updateRun);
app.put('/runs/:runId/accept/:id', runs.acceptRun);
app.put('/runs/:runId/coords/:id', runs.pushCoords);
app.delete('/runs/:id', runs.deleteRun);

app.post('/login', auth.authenticate, auth.login);
app.post('/logout', auth.logout);

app.listen(8080);
console.log('Listening on port 8080');
