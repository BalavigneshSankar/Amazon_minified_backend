const express = require("express");
const authController = require("./../controller/authController");
const userController = require("./../controller/userController");

const router = express.Router();

router.route("/:id").get(authController.protect, userController.getUser);
router.route("/signup").post(authController.signUp);
router.route("/logIn").post(authController.logIn);

module.exports = router;
