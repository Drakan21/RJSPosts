// --- IMPORT --- //
const express = require("express");
const router = express.Router();

// --- DEFINITION --- //
router.get("^/$|^/index(.html)?", (req, res) => {
	res.status(200).json({ message: "Welcome!" });
});

module.exports = router;
