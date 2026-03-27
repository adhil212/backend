const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Product = require("../models/product");

router.post("/add", upload.single("image"), async (req, res) => {
 
  
  try {
    console.log("BODY 👉", req.body);
    console.log("FILE 👉", req.file);

    
    if (!req.file) {
      return res.status(400).json({ error: "No image file uploaded" });
    }

   
    const { name, description, price, stock, category, brand, tag } = req.body;
    
    if (!name || !description || !price || !stock || !category || !brand) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const product = new Product({
      name,
      description,
      price: Number(price),
      stock: Number(stock),
      category,
      brand,
      tag,
      image: req.file.path, 
    });

    await product.save();
    console.log("✅ SAVED:", product);

    res.status(201).json({
      success: true,
      message: "Product added successfully",
      product,
    });

  } catch (err) {
    console.error("SAVE ERROR 👉", err);
    res.status(500).json({ 
      error: err.message,
      details: err.stack 
    });
  }
});

module.exports = router;