const mongoose = require('mongoose')

const chatSchema = new mongoose.Schema({
	users: {
		type: [mongoose.Schema.Types.ObjectId, mongoose.Schema.Types.ObjectId],
		required: true,
		unique: false,
	},
	createdAt: {
		type: Date,
		required: true,
		unique: false,
	},
	messages: {
		type: [mongoose.Schema.Types.ObjectId],
		required: false,
		unique: false,
	},
});

module.exports = mongoose.model("Chat", chatSchema);