var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todo = require('../models/todos');

mongoose.Promise = require('bluebird');

router.get('/todos', function(req, res, next) {
	mongoose.connect('mongodb://localhost/mydb', function(err) {
		if (err) {
			console.log('can not connect database');
			throw err;
		}
		console.log('database connected');
	});

	todo.find(function(err, rows) {
		if (err) {
			res.send('database error', {
				title: 'error'
			});
		} else {
			res.render('get_todos', {
				title: 'Todos Api',
				name: 'All todos data',
				rows: rows
			});
		}
	});

	mongoose.disconnect(function(err) {
		if (err) {
			console.log(err);
		} else {
			console.log('Connection Closed');
		}
	});
});

router.post('/todos', function(req, res, next) {

	if (!req.body.id || !req.body.name || !req.body.completed || !req.body.updated_at) {
		res.send('Sorry, fill in the form correctly.');
		//res.redirect('/todos');
	} else {
		mongoose.connect('mongodb://localhost/mydb', function(err) {
			if (err) {
				console.log('can not connect database');
				throw err;
			}
			console.log('database connected');
		})
		var newTodo = new todo({
			id: req.body.id,
			name: req.body.name,
			completed: req.body.completed,
			updated_at: req.body.updated_at
		});
		newTodo.save(function(err, result) {
			if (err) {
				res.send('database error');
			} else {
				res.send('Inserted ' + result);
			}
		});
		mongoose.disconnect(function(err) {
			if (err) {
				console.log(err);
			} else {
				console.log('Connection Closed');
			}
		});
	}
});

module.exports = router;