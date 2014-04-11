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

var Product = new Schema({
	name : {type:String, required:true},
	category : {type:String, required:true},
	image : [Image],
	barcode : {type:Number}
});

module.exports = mongoose.model('Product', Product);