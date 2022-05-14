/**
 * User registration
 */
// --- IMPORT --- //
const bcrypt = require("bcrypt");

//
const __model = require("../models/User");

const create = async (req, res) => {
	// extract username / pw / email from request
	const { username, password, email } = req.body;
	// check all is present
	if (!username || !password || !email) {
		return res.status(400).json({ message: `Username and password required.` });
	}

	// check for duplicate user
	const duplicate = await __model
		.findOne({ username: { $regex: username, $options: "i" } })
		.exec();
	// if duplicate exists, send error
	if (duplicate) {
		return res.sendStatus(409);
	}
	try {
		// hash the password for storage
		const hashedpw = await bcrypt.hash(password, 10);
		// create new MongoDB entry for user
		const result = await __model.create({
			username,
			password: hashedpw,
			email,
		});
		//
		res.status(201).json({ message: `New user created` });
	} catch (err) {
		res.status(500).json({ message: err.message });
	}
};

module.exports = { create };
