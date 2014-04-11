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

var Place = new Schema({
	name : {type:String, required:true},
	address : {type:String},
	city : {type:String},
	image : [Image],
	latitude : {type:Number},
	longitude : {type:Number}
});

module.exports = mongoose.model('Place', Place);