/**
 * Cross Origin Resource configs
 */
// import cors and origin permission
const _cors = require("cors");
const perm = require("./permitted");
// setup new cors options
const corsOptions = {
	origin: (origin, callback) => {
		if (perm.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not permitted by CORS"));
		}
	},
	optionsSuccessStatus: 200,
	credentials: true,
};
// init cors
const corsConfig = (application, options = null) => {
	application.use(_cors(options || corsOptions));
};
// export new cors instance
module.exports = corsConfig;
