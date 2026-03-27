const User = require("../models/user");
// const Product = require("../models/product")



const getAllOrders = async (req, res) => {
  try {
    const users = await User.find()
      .select("name email orders")
      .populate("orders.items.productId");

    let allOrders = [];

    users.forEach((user) => {
      user.orders.forEach((order) => {

        const formattedItems = order.items.map((item) => ({
          _id: item._id,
          qty: item.qty,
          name: item.productId?.name,
          price: item.productId?.price,
          image: item.productId?.image,
          brand: item.productId?.brand,
        }));

        allOrders.push({
          ...order._doc,

          user: {
            userId: user._id,
            name: user.name,
            email: user.email,
          },

          items: formattedItems,
        });
      });
    });

    // latest first
    allOrders.sort((a, b) => new Date(b.date) - new Date(a.date));

    res.json(allOrders);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
const updateOrderStatus = async (req, res) => {
  try {
    
    const { userId, orderId, status } = req.body;
  

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
   

    const order = user.orders.find(o => o.orderId === orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
     

    order.status = status;

    await user.save();

    res.json({ message: "Status updated", status });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = {
  getAllOrders,
  updateOrderStatus
};