var mongoose = require('mongoose'),
ObjectId = mongoose.Schema.Types.ObjectId;

var runnerSchema = mongoose.Schema({
	username : String,
	password : String,
	fullname : String,
	email : String,
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
	friends : [ObjectId],
	achievements : [ObjectId],
	runs : [ObjectId]
});

runnerSchema.statics.findAll = function(cb) {
	this.find({},'-password', cb);
};

runnerSchema.statics.findOneNoPw = function(query, cb) {
	this.findOne(query, '-password', cb);
};

runnerSchema.methods.validPassword = function(password) {
	return this.password == password;
};

module.exports = mongoose.model('Runner', runnerSchema);
