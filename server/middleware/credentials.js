// import permissable origins
const perm = require("../config/permitted");

/// set access control headers if request originates from permitted source
const __credentials = (req, res, next) => {
	const origin = req.headers.origin;
	if (perm.includes(origin)) {
		res.header("Access-Control-Allow-Origin", process.env.HOST);
		res.header("Access-Control-Allow-Credentials", true);
		res.header(
			"Access-Control-Allow-Headers",
			"Origin, X-Requested-With, Content-Type, Accept"
		);
	}
	next();
};

module.exports = { credentials: __credentials };
