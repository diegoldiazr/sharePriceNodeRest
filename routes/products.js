//servicio rest para la gestion de productos
// products.js
//------------------------------------------

module.exports = function(app){

	var Product = require('../models/products.js');

	//GET - Return all the products
	findAllProducts = function(req, res){
		console.log('GET - /products');
		return Product.find(function(err, products){
			if (!err){
				return res.send(products);
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});
	};

	//GET - Return a product with specified id
	findByIdProduct = function(req, res){
		console.log('GET - /product/:id');
		return Product.findById(req.params.id, function(err, product){
			if (!product){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}
			if (!err){
				return res.send({status:'OK', product:product});
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});
	};

	//GET - Return products by params request
	findByParams = function(req, res){
		console.log('GET - /product?');

		//componemos la query de busqueda

		var query = Product.find({});

		if (req.query.name != null)	query.where('name', req.query.name);
		if (req.query.category != null)	query.where('category', req.query.category);
		if (req.query.barcode != null)	query.where('barcode', req.query.barcode);
		//query.limit(5);
		//query.skip(100);

		return query.exec(function (err, product) {
		  if (!product){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}
			if (!err){
				return res.send({status:'OK', product:product});
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});
	};

	//POST - Add a new product
	addProduct = function(req, res){		
		console.log('POST - /product');
		console.log(req.body);
		var product = new Product({
			name	: req.body.name, 
			category: req.body.category,  
			image	: req.body.image,
			barcode : req.body.barcode
		});

		return product.save(function(err){
			if (!err){
				console.log('Product created');
				return res.send({status:'OK', product:product});
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});

		res.send(product);
	};

	//PUT - Update a product
	updateProduct = function(req, res){
		console.log('PUT - /product/:id');
		console.log(req.body);
		return Product.findById(req.params.id, function(err, product){
			if (!product){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}

			if (req.body.name != null) product.name = req.body.name;
			if (req.body.category != null) product.category = req.body.category;
			if (req.body.image != null) product.image = req.body.image;
			if (req.body.barcode != null) product.barcode = req.body.barcode;

			return product.save(function(err){
				if (!err){
					console.log('Product updated!');
					return res.send({status:'OK', product:product});
				}else{
					res.statusCode = 500;
					console.log('Internal error (%d): %s', res.statusCode, err.message);
					return res.send({error:'Server error'});
				}
			});
		});

		res.send(product);	
	};

	//DELETE - Delete a product with specified id
	deleteProduct = function(req, res){
		console.log('DELETE - /product/:id');
		console.log(req.body);
		return Product.findById(req.params.id, function(err, product){
			if (!product){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}

			return product.remove(function(err){
				if (!err){
					console.log('Product removed!');
					return res.send({status:'OK', product:product});
				}else{
					res.statusCode = 500;
					console.log('Internal error (%d): %s', res.statusCode, err.message);
					return res.send({error:'Server error'});
				}
			});
		});
		
		res.send(product);	
	};

	//Link routes and functions
	app.get( 	'/products'		, findAllProducts);
	app.get( 	'/product/:id'	, findByIdProduct);
	app.get( 	'/product?'		, findByParams);
	app.post(	'/product'		, addProduct);
	app.put( 	'/product/:id'	, updateProduct);
	app.delete(	'/product/:id'	, deleteProduct);

}