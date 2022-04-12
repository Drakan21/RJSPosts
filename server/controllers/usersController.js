const __model = require("../models/User");

const getAll = async (req, res) => {
	const result = await __model
		.find({})
		.sort({ username: "ascending" })
		.all()
		.select("username roles joined");
	if (!result) return res.status(204).send({ message: "No Users found." });
	res.json(result);
};

module.exports = {
	getAll,
};
