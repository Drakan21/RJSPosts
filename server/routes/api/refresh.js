// --- IMPORTS --- //
const express = require("express");
const router = express.Router();
const path = require("path");
// --- DECLARATIONS --- //
const __controller_path = path.join(__dirname, "..", "..", "controllers", "refreshController");
const { refresh } = require(__controller_path);

router.get("/", refresh);

module.exports = router;
