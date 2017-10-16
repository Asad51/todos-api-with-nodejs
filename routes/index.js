var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
	res.render('index', { title: 'Todos Api', name: 'This is just simple'});
});

module.exports = router;