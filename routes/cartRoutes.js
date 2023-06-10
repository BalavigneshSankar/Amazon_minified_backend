const express = require("express");
const cartController = require("./../controller/cartController");
const authController = require("./../controller/authController");

const router = express.Router();

router
  .route("/")
  .get(authController.protect, cartController.getCartItems)
  .post(authController.protect, cartController.createCartItem)
  .patch(authController.protect, cartController.updateCartItems);

module.exports = router;
