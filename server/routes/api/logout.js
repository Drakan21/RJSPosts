// --- IMPORT --- //
const express = require("express");
const router = express.Router();
const path = require("path");
// --- DEFINITIONS --- //
const __controller_path = path.join(__dirname, "..", "..", "controllers", "deauthController");
//
const controller = require(__controller_path);

router.get("/", controller.deauthenticate);

module.exports = router;
