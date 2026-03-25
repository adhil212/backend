const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Product = require("../models/product");

router.post("/add", upload.single("image"), async (req, res) => {
  try {
    console.log("BODY 👉", req.body);
    console.log("FILE 👉", req.file);
    const product = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      category: req.body.category,
      brand: req.body.brand,
      tag: req.body.tag,
      image: req.file.path, // ✅ Cloudinary URL
    });

    await product.save();
    console.log("✅ SAVED:", product);

    res.json(product);
  }catch (err) {
  console.error("SAVE ERROR 👉", err);
  res.status(500).json({ error: err.message });
}
});

module.exports = router;