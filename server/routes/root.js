// --- IMPORT --- //
const express = require("express");
const router = express.Router();

const path = require("path");
const { log } = require("../middleware/logger");
// --- DEFINITION --- //

router.get("^/$|^/index(.html)?", (req, res) => {
	res.status(200).json({ message: "Welcome!" });
});

module.exports = router;
