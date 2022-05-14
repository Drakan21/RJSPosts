/**
 * Role verification middleware
 * - checks assigned user roles for determining route access
 */
// middleware for use on routes
const verifyRoles = (...permittedRoles) => {
	return (req, res, next) => {
		// check if req specified roles
		if (!req?.roles) return res.sendStatus(401); // Unauthorized

		// get permitted roles:
		const roles = [...permittedRoles];
		const result = req.roles
			.map((role) => roles.includes(role))
			.find((value) => value === true);

		if (!result) return res.sendStatus(401); // Unauthorized

		next();
	};
};

module.exports = verifyRoles;
