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
	points : {type:Number},
	state : {type:Number}, //status 0 es activo, 1 inactivo, 2 pendiente de confirmacion de email
	rol : {type:Number, required:true} //rol 0 admin, 1 user
});

module.exports = mongoose.model('User', User);