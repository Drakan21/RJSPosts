// import mongoose
const mongoose = require("mongoose");

const __mongoDBConnect = async () => {
	try {
		await mongoose.connect(process.env.DB_URL, {
			useUnifiedTopology: true,
			useNewUrlParser: true,
		});
	} catch (err) {
		console.error(err);
	}
};

module.exports = { connect: __mongoDBConnect };
