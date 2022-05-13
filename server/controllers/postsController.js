// --- DEFINITIONS --- //

const __model = require("../models/Post");

/// get all posts
const getAll = async (req, res) => {
	const result = await __model
		.find()
		.populate("author", "_id username")
		.sort({ upDate: "ascending" })
		.all();
	if (!result) {
		return res.status(204).json({ message: `No Posts Found.` });
	}
	res.json(result);
};

/// get post by id
const getById = async (req, res) => {
	if (!req?.params?.id) {
		return res.status(400).json({ message: `An ID parameter is required.` });
	}
	try {
		const { id } = req.params;
		const result = await __model.findById(id).populate("author", "_id username");
		if (!result) {
			return res.status(204).json({ message: `Post could not be found.` });
		}
		res.status(200).json(result);
	} catch (err) {
		res.status(204).json({ message: `Could not find post.` });
	}
};

/// get post by user id
const getByUserId = async (req, res) => {
	if (!req?.params?.id) {
		return res.status(400).json({ message: `An ID parameter is required.` });
	}
	try {
		const { id } = req.params;
		const result = await __model
			.find({})
			.where({ author: id })
			.populate("author", "_id username")
			.sort({ upDate: "ascending" })
			.exec();
		if (!result) {
			return res.status(204).json({ message: `No Posts could be found for this user.` });
		}
		res.status(200).json(result);
	} catch (err) {
		res.status(204).json({ message: `Could not find post.` });
	}
};

/// create new post
const create = async (req, res) => {
	if (!req?.body?.title || !req?.body?.body) {
		return res.status(400).json({ message: `Title and body are required.` }); // incomplete data
	}

	try {
		const { author, title, body } = req.body;
		const result = await __model.create({
			title,
			body,
			author,
		});
		res.status(200).json(result);
	} catch (err) {
		res.status(401).json({ message: "Could not create a new post." });
	}
};

/// update post
const update = async (req, res) => {
	if (!req?.body?.id) {
		return res.status(401).json({ message: `Post ID required to perform edit.` });
	}
	if (!req?.body?.title || !req?.body?.body) {
		return res.status(401).json({ message: `Title and body are required.` }); // incomplete data
	}

	try {
		const { id, author, title, body } = req.body;
		const found = await __model.findById(id).populate("author", "_id");

		if (!found) {
			return res
				.status(204)
				.json({ message: `Post unavailable for edit (moved or deleted).` }); // Data not found
		}
		if (author != found.author._id) {
			return res.status(401).json({ message: `Post does not belong to this user.` }); // Unauthorized
		}

		const resp = await __model.findByIdAndUpdate(
			id,
			{
				title,
				body,
				upDate: Date.now(),
				edited: true,
			},
			{ new: true }
		);

		res.status(201).json(resp);
	} catch (err) {
		console.error(err.message);
	}
};

/// remove post
const remove = async (req, res) => {
	if (!req?.params?.id) {
		return res.status(400).json({ message: `Post ID is required.` });
	}

	try {
		const { id } = req.params;
		if (!id) {
			return res.sendStatus(400);
		}
		const found = await __model.findOne({ _id: id }).exec();
		if (!found) {
			return res
				.status(204)
				.json({ message: `No Post found with matching ID - could not remove.` });
		}
		const result = await found.deleteOne({ _id: id });
		res.status(201).json(result);
	} catch (err) {
		console.log(err.message);
	}
};

module.exports = {
	getAll,
	getById,
	getByUserId,
	create,
	update,
	remove,
};
