const __model = require("../models/User");
const { REF_CK } = require("../config/cookieConfig");

const deauthenticate = async (req, res) => {
	const cookies = req.cookies;
	if (!cookies?.jwt) {
		return res.sendStatus(204);
	}

	const rftk = cookies.jwt;
	const found = await __model.findOne({ refreshToken: rftk }).exec();
	if (!found) {
		res.clearCookie("jwt", REF_CK);
		return res.sendStatus(401);
	}

	await __model.findByIdAndUpdate(found._id, { refreshToken: "" });
	res.clearCookie("jwt", REF_CK);
	res.sendStatus(204);
};

module.exports = { deauthenticate };
