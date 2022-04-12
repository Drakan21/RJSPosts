// init express
const express = require("express");
const serv = express();
// init mongoose
const mongoose = require("mongoose");
// init dotenv.
require("dotenv").config();
// core modules
const path = require("path");

// init cors - custom permissions
const cors = require("./config/corsConfig");

// middleware...
const { credentials } = require("./middleware/credentials");
const { errors } = require("./middleware/errorHandler");
// mw::utils
const { log } = require("./middleware/logger");

// cfg
const { connect } = require("./config/dbConnector");

// --- Auth --- //
const { auth } = require("./middleware/verifyToken");
const cookies = require("cookie-parser");
const { set } = require("date-fns");

// port
const PORT = process.env.PORT || 5500;

// logging ??
serv.use(log());

// connect to db
connect();

// set credentials middleware for request/response headers
serv.use(credentials);

// init cors for server
cors(serv);

// built in middleware:
// built in url decoded/encoder for request data
serv.use(express.urlencoded({ extended: false }));
// built in json parser
// content-type: application/json
serv.use(express.json());
// cookies
serv.use(cookies());

// --- Routes --- //
// home/index
// public
serv.use("/register", require("./routes/api/register"));
serv.use("/login", require("./routes/api/auth"));
serv.use("/refresh", require("./routes/api/refresh"));
serv.use("/logout", require("./routes/api/logout"));
// semi-protected
serv.use("/posts", require("./routes/api/posts"));
// protected
serv.use("/users", require("./routes/api/users"));

// 404 catch-all
serv.all("*", (req, res) => {
	res.status(404);
	if (req.accepts("json")) {
		res.json({ error: "404 Not Found", status: 404 });
	} else {
		res.type("txt").send("404 Not Found");
	}
});

// error handling?
serv.use(errors);

// connect to database, and open server port for listening...
mongoose.connection.once("open", () => {
	console.log(`Connected to MongoDB`);
	serv.listen(PORT, () => console.log(`Server up and running on port [:${PORT}]`));
});
