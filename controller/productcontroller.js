const express = require("express");
const Product = require("../models/product");
const asyncErrorResolver =require("../middleware/asyncErrorResolver")

const getallproduct = asyncErrorResolver( async (req,res)=>{
  const {category, brand, search, sort}=req.query
  let query={}
  if(category&&category!=="ALL"){
    query.category=category
  }
  if (brand && brand !== "All") {
    query.brand = brand;
  }
  
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } }
      
      // { description: { $regex: search, $options: "i" } },
      // { category: { $regex: search, $options: "i" } }
    ];
  }
   let products =  Product.find(query)
   // SORTING
  if (sort === "priceLowHigh") {
    products = products.sort({ price: 1 });
  }

  if (sort === "priceHighLow") {
    products = products.sort({ price: -1 });
  }
 const allproducts= await products
  // if(allproducts.length ==0){
  //   return res.status(404).json({message:"no product found"})
  // }
   res.status(200).json({
    status: "Success",
    results: allproducts.length,
    data: allproducts
  });

})

const getproductbyid = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await Product.findById( id );
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);

    res.json({ message: "Product deleted" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  getallproduct,
  getproductbyid,
  deleteProduct
};