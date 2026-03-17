const User = require("../models/user");
const Product = require("../models/product");



// GET USER ORDERS
const getOrders = async (req, res) => {
  try {

    const userId = req.params.userId;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const orders = user.orders || [];

    // FIX OLD ORDERS THAT ONLY HAVE productId
    for (let order of orders) {

      for (let item of order.items) {

        if (!item.name && item.productId) {

          const product = await Product.findById(item.productId);

          if (product) {

            item.name = product.name;
            item.price = product.price;
            item.image = product.image;
            item.brand = product.brand;

          }

        }

      }

    }

    const sortedOrders = orders.sort(
      (a, b) => new Date(b.date) - new Date(a.date)
    );

    res.json(sortedOrders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};



// CANCEL ORDER
const cancelOrder = async (req, res) => {

  try {

    const { userId, orderId } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.orders = user.orders.filter(
      (order) => order.orderId !== orderId
    );

    await user.save();

    res.json({
      message: "Order cancelled successfully"
    });

  } catch (err) {

    res.status(500).json({ message: err.message });

  }

};



module.exports = {
  getOrders,
  cancelOrder
};