//servicio rest para la gestion de lugares
// users.js
//------------------------------------------

module.exports = function(app){

	var User = require('../models/users.js');

	//GET - Return all the users
	findAllUsers = function(req, res){
		console.log('GET - /users');
		return User.find(function(err, users){
			if (!err){
				return res.send(users);
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});
	};

	//GET - Return a user with specified id
	findById = function(req, res){
		console.log('GET - /user/:id');
		return User.findById(req.params.id, function(err, user){
			if (!user){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}
			if (!err){
				return res.send({status:'OK', user:user});
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});
	};

	//GET - Return a user with specified username
	findByUserName = function(req, res){
		console.log('GET - /user?:username=');
		return User.findOne({username : req.query.username}, function(err, user){
			if (!user){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}
			if (!err){
				return res.send({status:'OK', user:user});
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});
	};

	//POST - Add a new user
	addUser = function(req, res){		
		console.log('POST - /user');
		console.log(req.body);
		var user = new User({
			username	: req.body.username, 
			pass	 	: req.body.pass,  
			fullname	: req.body.fullname,
			image		: req.body.image,
			email		: req.body.email,
			points	 	: req.body.points
		});

		return user.save(function(err){
			if (!err){
				console.log('User created');
				return res.send({status:'OK', user:user});
			}else{
				res.statusCode = 500;
				console.log('Internal error (%d): %s', res.statusCode, err.message);
				return res.send({error:'Server error'});
			}
		});

		res.send(user);
	};

	//PUT - Update a user
	updateUser = function(req, res){
		console.log('PUT - /user/:id');
		console.log(req.body);
		return User.findById(req.params.id, function(err, user){
			if (!user){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}

			if (req.body.username != null) user.username = req.body.username;
			if (req.body.pass != null) user.pass = req.body.pass;
			if (req.body.fullname != null) user.fullname = req.body.fullname;
			if (req.body.image != null) user.image = req.body.image;
			if (req.body.email != null) user.email = req.body.email;
			if (req.body.points != null) user.points = req.body.points;

			return user.save(function(err){
				if (!err){
					console.log('User updated!');
					return res.send({status:'OK', user:user});
				}else{
					res.statusCode = 500;
					console.log('Internal error (%d): %s', res.statusCode, err.message);
					return res.send({error:'Server error'});
				}
			});
		});

		res.send(user);	
	};

	//DELETE - Delete a user with specified id
	deleteUser = function(req, res){
		console.log('DELETE - /user/:id');
		console.log(req.body);
		return User.findById(req.params.id, function(err, user){
			if (!user){
				res.statusCode=204;
				return res.send({ error:'Not found'});
			}

			return user.remove(function(err){
				if (!err){
					console.log('User removed!');
					return res.send({status:'OK', user:user});
				}else{
					res.statusCode = 500;
					console.log('Internal error (%d): %s', res.statusCode, err.message);
					return res.send({error:'Server error'});
				}
			});
		});
		
		res.send(user);	
	};

	//Link routes and functions
	app.get( 	'/users'	, findAllUsers);
	app.get( 	'/user/:id'	, findById);
	app.get( 	'/user?:username'	, findByUserName);
	app.post(	'/user'		, addUser);
	app.put( 	'/user/:id'	, updateUser);
	app.delete(	'/user/:id'	, deleteUser);

}