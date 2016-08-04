var mongoose = require('mongoose');

var todoSchema = mongoose.Schema({
	id: {
		type: Number,
		default: 0,
		required: true
	},
	completed: {
		type: Boolean,
		required: true
	},
	text: {
		type: String,
	},
	user_id: {
		type: Number,
		required: true
	}

});

module.exports.Todo = mongoose.model('todos', todoSchema);

