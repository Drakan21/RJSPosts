// --- IMPORT --- //
const express = require("express");
const router = express.Router();
const path = require("path");

// --- DEFINITIONS --- //
const __controller_path = path.join(__dirname, "..", "..", "controllers", "registerController");

const controller = require(__controller_path);

router.post("/", controller.create);

module.exports = router;
