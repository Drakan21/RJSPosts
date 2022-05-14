// --- IMPORTS --- //
const express = require("express");
const router = express.Router();
const path = require("path");

// --- DECLARATIONS --- //
const __users_controller_path = path.join(__dirname, "..", "..", "controllers", "usersController");
const __posts_controller_path = path.join(__dirname, "..", "..", "controllers", "postsController");

const users_controller = require(__users_controller_path);
const posts_controller = require(__posts_controller_path);

router.get("/:id", users_controller.getById);
router.get("/:id/posts", posts_controller.getByUserId);

module.exports = router;
