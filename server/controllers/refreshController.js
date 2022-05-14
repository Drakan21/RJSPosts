/**
 * Handle AccessToken refresh for user requests
 */
// --- IMPORTS --- /
const jwt = require("jsonwebtoken");
///
const __model = require("../models/User");
const { TOKEN_TIMEOUT } = require("../config/tokensConfig");
const { log } = require("../middleware/logger");

const refresh = async (req, res) => {
	// extract cookie from request
	const cookies = req.cookies;
	if (!cookies?.jwt) {
		return res.sendStatus(401); // Unauthorized
	}
	const rftk = cookies.jwt;
	// find user for refresh token
	const found = await __model.findOne({ refreshToken: rftk }).exec();
	if (!found) {
		return res.sendStatus(401); // Unauthorized
	}
	// verify token against secret
	jwt.verify(rftk, process.env.RTKNSC, (err, decoded) => {
		if (err || decoded.username !== found.username) {
			return res.sendStatus(403);
		}

		const roles = Object.values(found.roles).filter(Boolean);
		// sign new access token for user
		const actk = jwt.sign(
			{
				UserInfo: {
					username: found.username,
					roles: roles,
				},
			},
			process.env.ATKNSC,
			{ expiresIn: TOKEN_TIMEOUT.access }
		);
		// return new auth object
		res.json({ accessToken: actk, roles, user: found.username });
	});
};

module.exports = { refresh };
