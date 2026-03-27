const express = require("express");
const router = express.Router();
const crypto = require("crypto");

const User = require("../models/user");
const Product = require("../models/product");

const verifyPayment = async (req, res) => {
  try {

    const userId = req.user.id; 

    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      address,
      paymentMethod
    } = req.body;

   
    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(razorpay_order_id + "|" + razorpay_payment_id)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid payment" });
    }

    

    const user = await User.findById(userId).populate("cart.productId");

    if (!user || user.cart.length === 0) {
      return res.status(400).json({ message: "Cart empty" });
    }

    let total = 0;

    for (let item of user.cart) {
      const product = item.productId;

      if (product.stock < item.qty) {
        return res.status(400).json({
          message: `${product.name} out of stock`,
        });
      }

      product.stock -= item.qty;
      await product.save();

      total += product.price * item.qty;
    }

    const order = {
      orderId: `ORD-${Date.now()}`,
      items: user.cart.map((item) => ({
        productId: item.productId._id,
        qty: item.qty,
      })),
      address,
      paymentMethod,
      totalAmount: total,
      status: "Processing",
      date: new Date(),
    };

    user.orders.push(order);
    user.cart = [];

    await user.save();

    res.json({
      message: "Payment verified & order placed",
      order,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

router.post("/", verifyPayment);

module.exports = router;