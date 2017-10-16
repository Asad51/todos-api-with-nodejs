var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var todo = require('../models/todos');

mongoose.Promise = require('bluebird');

router.get('/', function (req, res, next) {
	mongoose.connect('mongodb://localhost/mydb', function (err) {
        if (err) {
            console.log('can not connect database');
            throw err;
        }
        console.log('database connected');
    });

    todo.find(function (err, rows) {
    	if(err){
    		res.send('database error', {title: 'error'});
    	}
    	else {
            res.render('index', {title: 'Todos Api', name: 'All todos data', rows: rows});
        }
    });

	mongoose.disconnect(function (err) {
        if (err) {
            console.log(err);
        } else {
            console.log('Connection Closed');
        }
    });
});

module.exports = router;