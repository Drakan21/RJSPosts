/**
 * User lists and requests for profiles
 */
const __model = require("../models/User");
const __posts = require("../models/Post");

const getAll = async (req, res) => {
	const result = await __model
		.find({})
		.sort({ username: "ascending" })
		.all()
		.select("username roles joined");
	if (!result) return res.status(204).send({ message: "No Users found." });
	res.json(result);
};

const getById = async (req, res) => {
	if (!req?.params?.id) {
		return res.status(400).json({ message: `An ID parameter is required.` });
	}
	try {
		const id = req.params.id;
		const found = await __model.findById(id).exec();
		if (!found) {
			return res.status(204).json({ message: "Could not find user" });
		}

		const posts = await __posts.find({}).where({ author: id }).exec();
		const postsCount = posts?.length || 0;
		const { _id, username, email, joined } = found;
		res.status(200).json({ id: _id, username, email, joined, postsCount });
	} catch (err) {
		res.status(204).json({ message: "Could not find user" });
	}
};

module.exports = {
	getAll,
	getById,
};
