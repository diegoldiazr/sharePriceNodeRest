//servicio rest para la gestion de lugares
// places.js
//------------------------------------------

module.exports = function(app){

	var Place = require('../models/places.js');

	//GET - Return all the places
	findAllPlaces = function(req, res){
		console.log('GET - /places');
		return Place.find(function(err, places){
			if (!err){
				return res.send(places);
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});
	};

	//GET - Return a place with specified id
	findById = function(req, res){
		console.log('GET - /place/:id');
		return Place.findById(req.params.id, function(err, place){
			if (!place){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}
			if (!err){
				return res.send({status:'OK', place:place});
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});
	};

	//GET - Return places by params request
	findByParams = function(req, res){
		console.log('GET - /place?');

		//componemos la query de busqueda

		var query = Place.find({});

		if (req.query.name != null)	query.where('name', req.query.name);
		if (req.query.city != null)	query.where('city', req.query.city);
		if (req.query.latitude != null)	query.where('latitude', req.query.latitude);
		if (req.query.longitude != null)	query.where('longitude', req.query.longitude);
		//query.limit(5);
		//query.skip(100);

		return query.exec(function (err, place) {
		  if (!place){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}
			if (!err){
				return res.send({status:'OK', place:place});
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});
	};

	//POST - Add a new place
	addPlace = function(req, res){		
		console.log('POST - /place');
		console.log(req.body);
		var place = new Place({
			name		: req.body.name, 
			address 	: req.body.address,  
			city		: req.body.city,
			image		: req.body.image,
			latitude	: req.body.latitude,
			longitude 	: req.body.longitude
		});

		return place.save(function(err){
			if (!err){
				console.log('Place created');
				return res.send({status:'OK', place:place});
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});

		res.send(place);
	};

	//PUT - Update a place
	updatePlace = function(req, res){
		console.log('PUT - /place/:id');
		console.log(req.body);
		return Place.findById(req.params.id, function(err, place){
			if (!place){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}

			if (req.body.name != null) place.name = req.body.name;
			if (req.body.address != null) place.address = req.body.address;
			if (req.body.city != null) place.city = req.body.city;
			if (req.body.image != null) place.image = req.body.image;
			if (req.body.latitude != null) place.latitude = req.body.latitude;
			if (req.body.longitude != null) place.longitude = req.body.longitude;

			return place.save(function(err){
				if (!err){
					console.log('Place updated!');
					return res.send({status:'OK', place:place});
				}else{
					res.statusCode = 500;
					console.log('Internal error (%d): %s', res.statusCode, err.message);
					return res.send({error:'Server error'});
				}
			});
		});

		res.send(place);	
	};

	//DELETE - Delete a place with specified id
	deletePlace = function(req, res){
		console.log('DELETE - /place/:id');
		console.log(req.body);
		return Place.findById(req.params.id, function(err, place){
			if (!place){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}

			return place.remove(function(err){
				if (!err){
					console.log('Place removed!');
					return res.send({status:'OK', place:place});
				}else{
					res.statusCode = 500;
					console.log('Internal error (%d): %s', res.statusCode, err.message);
					return res.send({error:'Server error'});
				}
			});
		});
		
		res.send(place);	
	};

	//Link routes and functions
	app.get( 	'/places'		, findAllPlaces);
	app.get( 	'/place/:id'	, findById);
	app.get( 	'/place?'		, findByParams);
	app.post(	'/place'		, addPlace);
	app.put( 	'/place/:id'	, updatePlace);
	app.delete(	'/place/:id'	, deletePlace);

}