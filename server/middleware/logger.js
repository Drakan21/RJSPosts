/**
 * Logging handler for requests and errors on server
 * - used to log incoming request timestamps / origins / routes / responses
 */
// --- IMPORTS --- //
const fs = require("fs");
const fsps = require("fs/promises");
const path = require("path");
const { v4: uuid } = require("uuid");
const { format } = require("date-fns");

// --- files --- //
const __log_dir = "logs";
const __log_file = "requests.log";
const __err_file = "errors.log";
// --- formats --- //
const __dt_fmt = "PPpp";

//
const __logEvents = async (message, logname) => {
	const dt = `${format(new Date(), __dt_fmt)}`;
	const lg = `${dt}\t${uuid()}\t${message}\n`;

	try {
		const logPath = path.join(__dirname, "..", __log_dir);
		const logFile = logname || "events.log";

		if (!fs.existsSync(logPath)) {
			await fsps.mkdir(logPath);
		}
		await fsps.appendFile(path.join(logPath, logFile), lg, { encoding: "utf-8" });
	} catch (err) {
		console.error(err);
	}
};

const log = (file = null, ...additional) => {
	return async (req, res, next) => {
		const {
			method,
			url,
			headers: { origin },
			params: { id },
		} = req;
		__logEvents(
			`${method}\t${origin ?? "local"}\t${url}\t\t${id || ""}\t\t${
				additional ? JSON.stringify(additional) : ""
			}`,
			file || __log_file
		);
		next();
	};
};

const error = (err, file = null) => {
	return async (req, res, next) => {
		const { name, message } = err;
		__logEvents(`${name}: ${message}`, file || __err_file);
		next();
	};
};

module.exports = { log, error };
