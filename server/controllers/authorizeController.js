// --- IMPORT --- //
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
//
const __model = require("../models/User");
const { TOKEN_TIMEOUT } = require("../config/tokensConfig");
const { REF_CK } = require("../config/cookieConfig");

const authenticate = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({ message: "Username and password required." });
	}

	const found = await __model.findOne({ username: { $regex: username, $options: "i" } }).exec();
	if (!found) {
		return res.sendStatus(401); // Unauthorized
	}

	const match = await bcrypt.compare(password, found.password);
	if (match) {
		const roles = Object.values(found.roles).filter(Boolean);
		const accTk = jwt.sign(
			{
				UserInfo: {
					username: found.username,
					roles,
				},
			},
			process.env.ATKNSC,
			{ expiresIn: TOKEN_TIMEOUT.access }
		);
		const refTk = jwt.sign(
			{
				username: found.username,
			},
			process.env.RTKNSC,
			{ expiresIn: TOKEN_TIMEOUT.refresh }
		);

		// save tk in dbase for logout de-auth
		await __model.findByIdAndUpdate(found._id, { refreshToken: refTk });

		// construct response:
		res.cookie("jwt", refTk, REF_CK);
		res.json({ roles, accessToken: accTk, username: found.username });
	} else {
		res.sendStatus(401); // Unauthorized
	}
};

module.exports = { authenticate };
