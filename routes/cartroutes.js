const express = require("express");
const router = express.Router();

const { addtocart,getcart,updateCart,removeFromCart } = require("../controller/cartcontroller");

router.get("/get/:userid", getcart);
router.post("/add", addtocart);
router.put("/update",updateCart)
router.delete("/remove",removeFromCart)


module.exports = router;
