const express = require("express");
const authController = require("./../controller/authController");

const router = express.Router();

router.route("/signup").post(authController.signUp);
router.route("/logIn").post(authController.logIn);

module.exports = router;
