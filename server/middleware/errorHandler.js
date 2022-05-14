/**
 * General error handler and response manager for server (as catchall) / access errors
 */
const { error } = require("./logger");

const __errorHandler = (req, res, next) => {
	error(err, req, res, next);
	res.status(500).send(err.message);
};

module.exports = { errors: __errorHandler };
