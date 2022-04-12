const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const userSchema = new Schema({
	username: {
		type: String,
		require: true,
	},
	password: {
		type: String,
		require: true,
	},
	email: {
		type: String,
		require: true,
	},
	confirmed: {
		type: Boolean,
		default: false,
	},
	roles: {
		User: {
			type: Number,
			default: 5924,
		},
		Admin: Number,
		Editor: Number,
	},
	joined: {
		type: Date,
		default: Date.now,
	},
	refreshToken: String,
});

module.exports = mongoose.model("User", userSchema, "rjblogusers");
