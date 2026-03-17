const mongoose=require("mongoose")

const productSchema = new mongoose.Schema({
  id:String,
  name:String,
  description:String,
  price:Number,
  brand:String,
  category:String,
  tag:String,
  stock:Number,
  image:String
})

module.exports = mongoose.model("products", productSchema)