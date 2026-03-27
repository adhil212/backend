const express = require("express");
const router = express.Router();
const {getAllOrders,updateOrderStatus}=require("../controller/adminorder")

router.get("/userorder", getAllOrders);
router.put("/order-status", updateOrderStatus);

module.exports=router