// --- IMPORTS --- //
const express = require("express");
const router = express.Router();
const path = require("path");

// authentication
// const { auth } = require("../../middleware/verifyToken");
// const verifyRoles = require("../../middleware/verifyRoles");
// const { roles } = require("../../config/roles");

// --- DECLARATIONS --- //
const __users_controller_path = path.join(__dirname, "..", "..", "controllers", "usersController");
const __posts_controller_path = path.join(__dirname, "..", "..", "controllers", "postsController");

const users_controller = require(__users_controller_path);
const posts_controller = require(__posts_controller_path);

// router.get("/", auth, verifyRoles(roles.admin), users_controller.getAll);

router.get("/:id", users_controller.getById);
router.get("/:id/posts", posts_controller.getByUserId);

module.exports = router;
