
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const createOrder = async (req, res) => {
  try {
    console.log("KEY_ID:", process.env.RAZORPAY_KEY_ID);
console.log("KEY_SECRET:", process.env.RAZORPAY_KEY_SECRET);
    
    const { amount } = req.body;

    const options = {
      amount: amount * 100, // ₹ → paise
      currency: "INR",
      receipt: "order_" + Date.now(),
    };

    const order = await razorpay.orders.create(options);

    res.json(order);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Order creation failed" });
  }
};

module.exports = { createOrder };