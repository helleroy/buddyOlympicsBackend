/*
Copyright (c) 2013 Henrik Hellerøy, https://github.com/helleroy/
Licensed under the MIT license, http://opensource.org/licenses/MIT
*/

var mongoose = require('mongoose'),
bcrypt = require('bcrypt'),
ObjectId = mongoose.Schema.Types.ObjectId;

var SALT_ROUNDS = 10;

var runnerSchema = mongoose.Schema({
	username : {type : String, unique : true, required : true},
	password : {type : String, required : true},
	fullname : String,
	email : {type : String, unique : true, required : true},
	birthday : Date,
	gender : String,
	country : String,
	city : String,
	datejoined : Date,
	rank : Number,
	interests : String,
	ambition : String,
	description : String,
	profilepic : String,
	friends : [{type : ObjectId, ref : 'Runner'}],
	achievements : [ObjectId],
	runs : [{type : ObjectId, ref : 'Run'}],
	newruns : [{type : ObjectId, ref : 'Run'}]
});

runnerSchema.statics.findAll = function(cb) {
	this.find({},'-password', cb);
};

runnerSchema.statics.findOneNoPw = function(query, cb) {
	this.findOne(query, '-password', cb);
};

runnerSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

runnerSchema.pre('save', function(next) {
	var runner = this;

	if (!runner.isModified('password')) return next();

	bcrypt.hash(runner.password, SALT_ROUNDS, function(err, hash) {
		if (err) return next(err);
		runner.password = hash;
		next();
	});
});

module.exports = mongoose.model('Runner', runnerSchema);
