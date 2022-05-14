// --- IMPORTS --- //
const __model = require("../models/User");
const { REF_CK } = require("../config/cookieConfig");

// Handle logout / de-auth of user access
const deauthenticate = async (req, res) => {
	// extract cookie
	const cookies = req.cookies;
	// check cookie available
	if (!cookies?.jwt) {
		//
		return res.sendStatus(204);
	}
	//
	const rftk = cookies.jwt;
	// find user with related refresh token/cookie
	const found = await __model.findOne({ refreshToken: rftk }).exec();
	if (!found) {
		// remove cookie from browser cache regardless
		res.clearCookie("jwt", REF_CK);
		return res.sendStatus(401);
	}
	// update user with empty token
	await __model.findByIdAndUpdate(found._id, { refreshToken: "" });
	// remove cookie from browser cache regardless
	res.clearCookie("jwt", REF_CK);
	res.sendStatus(204);
};

module.exports = { deauthenticate };
