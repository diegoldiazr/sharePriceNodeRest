//products
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Image = new Schema({
	kind : {
		type: String,
		enum: ['thumbnail', 'detail'],
		required:true
	},
	url : {type:String, required:true}
});

var User = new Schema({
	username : {type:String, required:true},
	pass : {type:String, required:true},
	fullname : {type:String},
	image : [Image],
	email : {type:String},
	points : {type:Number}
});

module.exports = mongoose.model('User', User);