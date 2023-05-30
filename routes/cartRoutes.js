const express = require("express");
const cartController = require("./../controller/cartController");

const router = express.Router();

router
  .route("/")
  .get(cartController.getCartItems)
  .post(cartController.createCartItem);

router
  .route("/:id")
  .put(cartController.updateCartItem)
  .delete(cartController.deleteCartItem);

module.exports = router;
