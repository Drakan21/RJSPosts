/**
 * MongoDB Mongoose schema for Posts
 */
const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const postSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	body: {
		type: String,
		required: true,
	},
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
		required: true,
	},
	crDate: {
		type: Date,
		default: Date.now,
	},
	upDate: {
		type: Date,
		default: Date.now,
	},
	edited: {
		type: Boolean,
		default: false,
	},
});

// transform schema
postSchema.set("toJSON", {
	transform: (doc, result) => {
		return {
			id: doc._id,
			title: doc.title,
			body: doc.body,
			author: doc.author,
			date: doc.upDate,
			edited: doc.edited,
		};
	},
});

module.exports = mongoose.model("Post", postSchema, "rjblogposts");
