var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todo = require('../models/todos');

mongoose.Promise = require('bluebird');

/**
 * Haldling get('/todos') request
 */

router.get('/todos', function(req, res, next) {
	//connecting database
	mongoose.connect('mongodb://localhost/mydb', function(err) {
		if (err) {
			console.log('can not connect database');
			throw err;
		}
		console.log('database connected');
	});

	// finding all todo information and send to webpage
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

/**
 * Haldling post('/todos') request
 */

router.post('/todos', function(req, res, next) {
	//checking for missing input
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
		});
		//create new object for database schema
		var newTodo = new todo({
			id: req.body.id,
			name: req.body.name,
			completed: req.body.completed,
			updated_at: req.body.updated_at
		});
		//add record to database
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

router.put('/todos/:id', function (req, res, next) {
    mongoose.connect('mongodb://localhost/mydb', function(err) {
        if (err) {
            console.log('can not connect database');
            throw err;
        }
        console.log('database connected');
    });

    todo.findById(req.params.id, function (err, todo) {
        if (err){
            res.send('No data found');
        } else {
            if (!req.body.name || !req.body.completed || !req.body.updated_at) {
                res.send('Sorry, fill in the form correctly.');
                //res.redirect('/todos');
            } else {
                todo.update({"id": req.params.id}, {"name": req.body.name, "completed": req.body.completed, "updated_at": req.body.updated_at}, function(err, result) {
                    if (err) {
                        res.send('database error');
                    } else {
                        res.send('Updated ' + result);
                    }
                });
            }
        }
    });
});

module.exports = router;