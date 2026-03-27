const express = require("express");
const router = express.Router();

const {
  getallproduct,
  getproductbyid,
  deleteProduct,
} = require("../controller/productcontroller");

const protect = require("../middleware/authMiddleware");
const isAdmin = require("../middleware/adminmiddleware");


router.get("/", getallproduct);
router.get("/:id", getproductbyid);


router.delete("/:id", protect, isAdmin, deleteProduct);

module.exports = router;