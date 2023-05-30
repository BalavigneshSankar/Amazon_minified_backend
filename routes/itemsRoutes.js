const express = require("express");
const itemController = require("../controller/itemsController");

const router = express.Router();

router.route("/").get(itemController.getAllItems);

router.route("/:id").post(itemController.updateItem);

router.route("/filteredItems").get(itemController.getFilteredItems);

module.exports = router;
