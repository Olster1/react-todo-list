var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
	id: {
		type: Number,
		default: 0,
		required: true
	},
	username: {
		type: String,
		required: true
	}
});

module.exports.User = mongoose.model('users', userSchema);