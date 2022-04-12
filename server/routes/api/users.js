// --- IMPORTS --- //
const express = require("express");
const router = express.Router();
const path = require("path");
// authentication
const { auth } = require("../../middleware/verifyToken");
const verifyRoles = require("../../middleware/verifyRoles");
const { roles } = require("../../config/roles");
// --- DECLARATIONS --- //
const __controller_path = path.join(__dirname, "..", "..", "controllers", "usersController");

const controller = require(__controller_path);

router.get("/", auth, verifyRoles(roles.admin), controller.getAll);

module.exports = router;
