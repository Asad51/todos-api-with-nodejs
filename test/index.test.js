process.env.NODE_ENV = 'test';

var Todo = require('../models/todos');

var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app.js');
var baseURL = "http://localhost:3000";
var expect = chai.expect();

chai.use(chaiHttp);

describe("Todos api testing", function () {
	beforeEach(function(done){
		Todo.remove(function(){
			done();
		});
	});

	it('it returns all todo information', function (done) {
		return chai.request(server)
			.get('/todos')
			.then(function(res){
				expect(res).to.have.status(200);
				expect(res).to.be.json;
				expect(res.body).to.be.an('object');
				expect(res.body).to.be.an('array');
			
		});
	});
});
