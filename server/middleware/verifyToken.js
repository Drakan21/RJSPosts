// import jwt
const jwt = require("jsonwebtoken");

// verify if request token is valid
const __verifyToken = (req, res, next) => {
	const authhd = req.headers.authorization || req.header.Authorization;
	if (!authhd?.startsWith("Bearer ")) {
		return res.sendStatus(401);
	}
	const token = authhd.split(" ")[1];
	jwt.verify(token, process.env.ATKNSC, (error, decoded) => {
		if (error) return res.sendStatus(403); // forbidden : invalid token
		// get username / roles from decoded token
		req.user = decoded.UserInfo.username;
		req.roles = decoded.UserInfo.roles;
		next();
	});
};

module.exports = { auth: __verifyToken };
