// --- IMPORTS --- //

const express = require("express");
const router = express.Router();
const { auth } = require("../../middleware/verifyToken");
const path = require("path");

// --- DEFINITIONS --- //
const __controller_path = path.join(__dirname, "..", "..", "controllers", "postsController");

const control = require(__controller_path);

router.route("/").get(control.getAll).post(auth, control.create);
router.route("/:id").get(control.getById).put(auth, control.update).delete(auth, control.remove);
router.route("/user/:id").get(control.getByUserId);

module.exports = router;
