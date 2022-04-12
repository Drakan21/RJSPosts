// --- IMPORT --- //
const bcrypt = require("bcrypt");

//
const __model = require("../models/User");

const create = async (req, res) => {
	const { username, password, email } = req.body;
	if (!username || !password || !email) {
		return res.status(400).json({ message: `Username and password required.` });
	}

	const duplicate = await __model
		.findOne({ username: { $regex: username, $options: "i" } })
		.exec();
	if (duplicate) {
		return res.sendStatus(409);
	}
	try {
		const hashedpw = await bcrypt.hash(password, 10);

		const result = await __model.create({
			username,
			password: hashedpw,
			email,
		});

		res.status(201).json({ message: `New user created` });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { create };
