//servicio rest para la gestion de precios
// prices.js
//------------------------------------------

module.exports = function(app){

	var Price = require('../models/prices.js');

	//GET - Return all the prices
	findAllPrices = function(req, res){
		console.log('GET - /prices');
		return Price.find(function(err, prices){
			if (!err){
				return res.send(prices);
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});
	};

	//GET - Return a price with specified id
	findById = function(req, res){
		console.log('GET - /price/:id');
		return Price.findById(req.params.id, function(err, price){
			if (!price){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}
			if (!err){
				return res.send({status:'OK', price:price});
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});
	};

	//GET - Return prices by params request
	findByParams = function(req, res){
		console.log('GET - /price?');

		//componemos la query de busqueda

		var query = Price.find({});

		if (req.query.product_id != null)	query.where('product_id', req.query.product_id);
		if (req.query.place_id != null)	query.where('place_id', req.query.place_id);
		if (req.query.user_id != null)	query.where('user_id', req.query.user_id);
		if (req.query.date != null)	query.where('date').lte(req.query.date);
		query.sort({date:'desc'});
		//query.limit(5);
		//query.skip(100);

		return query.exec(function (err, price) {
		  if (!price){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}
			if (!err){
				return res.send({status:'OK', price:price});
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});
	};

	//POST - Add a new price
	addPrice = function(req, res){		
		console.log('POST - /price');
		console.log(req.body);
		var price = new Price({
			product_id	: req.body.product_id, 
			place_id 	: req.body.place_id,  
			user_id		: req.body.user_id,
			price		: req.body.price,
			date		: req.body.date
		});

		return price.save(function(err){
			if (!err){
				console.log('Price created');
				return res.send({status:'OK', price:price});
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});

		res.send(price);
	};

	//PUT - Update a price
	/*
	updatePrice = function(req, res){
		console.log('PUT - /price/:id');
		console.log(req.body);
		return Price.findById(req.params.id, function(err, price){
			if (!price){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}

			if (req.body.product_id != null) price.product_id = req.body.product_id;
			if (req.body.place_id != null) price.place_id = req.body.place_id;
			if (req.body.user_id != null) price.user_id = req.body.user_id;
			if (req.body.price != null) price.price = req.body.price;
			if (req.body.date != null) price.date = req.body.date;

			return price.save(function(err){
				if (!err){
					console.log('Price updated!');
					return res.send({status:'OK', price:price});
				}else{
					res.statusCode = 500;
					console.log('Internal error (%d): %s', res.statusCode, err.message);
					return res.send({error:'Server error'});
				}
			});
		});

		res.send(price);	
	};
	*/

	//DELETE - Delete a price with specified id
	deletePrice = function(req, res){
		console.log('DELETE - /price/:id');
		console.log(req.body);
		return Price.findById(req.params.id, function(err, price){
			if (!price){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}

			return price.remove(function(err){
				if (!err){
					console.log('Price removed!');
					return res.send({status:'OK', price:price});
				}else{
					res.statusCode = 500;
					console.log('Internal error (%d): %s', res.statusCode, err.message);
					return res.send({error:'Server error'});
				}
			});
		});
		
		res.send(price);	
	};

	//Link routes and functions
	app.get( 	'/prices'		, findAllPrices);
	app.get( 	'/price/:id'	, findById);
	app.get( 	'/price?'		, findByParams);
	app.post(	'/price'		, addPrice);
	//app.put( 	'/price/:id'	, updatePrice);
	app.delete(	'/price/:id'	, deletePrice);

}