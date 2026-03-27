const User = require("../models/user");
const Product = require("../models/product");


const getOrders = async (req, res) => {
  try {

    const userId = req.user.id; 

    const user = await User.findById(userId)
      .populate("orders.items.productId");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const sortedOrders = (user.orders || []).sort(
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

    const userId = req.user.id;
    const { orderId } = req.body;

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