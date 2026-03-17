const User = require("../models/user");
const Product = require("../models/product");

const checkout = async (req, res) => {
  try {
    const { userId, address, paymentMethod } = req.body;

    const user = await User.findById(userId).populate("cart.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.cart.length === 0) {
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
      items: user.cart,
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
      message: "Order placed successfully",
      order,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { checkout };
