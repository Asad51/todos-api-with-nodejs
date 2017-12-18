var mongoose = require('mongoose');
var todoSchema = mongoose.Schema({
	id: {type: Number, required: true, index: true, unique: true},
	name: {type: String, required: true },
	completed: Boolean,
	updated_at: { type: Date, default: Date.now }
});

module.exports = mongoose.model('todo', todoSchema);