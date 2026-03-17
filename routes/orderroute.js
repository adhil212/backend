const express = require("express");
const router = express.Router();

const { getOrders, cancelOrder } = require("../controller/ordercontroller");

router.get("/:userId", getOrders);

router.delete("/cancel", cancelOrder);

module.exports = router; 