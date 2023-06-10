const express = require("express");
const itemController = require("../controller/itemsController");
const authController = require("./../controller/authController");

const router = express.Router();

router.route("/").get(authController.protect, itemController.getAllItems);

router.route("/:id").post(authController.protect, itemController.updateItem);

router
  .route("/filteredItems")
  .get(authController.protect, itemController.getFilteredItems);

module.exports = router;
