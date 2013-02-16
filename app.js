var express = require('express'),
mongoose = require('mongoose'),
passport = require('passport'),
runners = require('./routes/runners'),
runs = require('./routes/runs'),
auth = require('./routes/authentication');

var app = express();

mongoose.connect(process.env.BUDDYMONGO || 'mongodb://localhost/buddyolympics');

app.configure(function(){
	app.use(express.bodyParser());
	app.use(passport.initialize());
});

app.get('/runners', runners.findAll);
app.get('/runners/:id', runners.findById);
app.post('/runners', runners.addRunner);
app.put('/runners/:id', runners.updateRunner);
app.delete('/runners/:id', runners.deleteRunner);

app.get('/runs', runs.findAll);
app.get('/runs/:id', runs.findById);
app.post('/runs', runs.addRun);
app.put('/runs/:id', runs.updateRun);
app.delete('/runs/:id', runs.deleteRun);

app.post('/login', auth.authenticate, auth.login);
app.post('/logout', auth.logout);

app.listen(8080);
console.log('Listening on port 8080');
