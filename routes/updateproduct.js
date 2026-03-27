const express = require("express");
const router = express.Router();
const upload = require("../middleware/upload");
const Product = require("../models/product");
router.put("/:id", upload.single("image"), async (req, res) => {
  try {
    const { id } = req.params;

    let updateData = {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      stock: req.body.stock,
      brand: req.body.brand,
      tag: req.body.tag,
    };

    // ✅ if new image uploaded
    if (req.file) {
      updateData.image = req.file.path;
    }

    const updated = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.json(updated);

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
module.exports=router