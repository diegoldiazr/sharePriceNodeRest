//products
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Price = new Schema({
	product_id : {type:String, required:true},
	place_id : {type:String, required:true},
	user_id : {type:String, required:true},
	price : {type:Number, required:true},
	date : {type:Date, required:true, default:Date.now}
});

module.exports = mongoose.model('Price', Price);