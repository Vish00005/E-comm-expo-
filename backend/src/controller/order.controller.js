const { Order } = require("../models/order");
const { Product } = require("../models/product");

module.exports.createOrder = async (req, res) => {
  try {
    const user_id = req.session.user.id;
    const { orderItems, shippingAddress, paymentResults, totalPrice } =
      req.body;

    if (!orderItems || orderItems.length === 0) {
      return res.status(400).json({ message: "Orders Required" });
    }

    if (!shippingAddress || !paymentResults || !totalPrice) {
      return res.status(400).json({ message: "All Fields Are Required" });
    }

    for (const item of orderItems) {
      const product = await Product.findById(item.product._id);
      if (!product) {
        return res
          .status(404)
          .json({ error: `Product ${item.name} not found` });
      }
      if (product.stock < item.quantity) {
        return res
          .status(400)
          .json({ error: `Insufficient stock for ${product.name}` });
      }
    }
    const order = new Order({
      user: user_id,
      orderItems,
      shippingAddress,
      paymentResults,
      totalPrice,
    });
    await order.save();

    for (const item of orderItems) {
      const product = await Product.findById(item.product._id);
      product.stock -= item.quantity;
      await product.save();
    }

    res.status(200).json({ message: "Order Placed Successfully", order });
  } catch (error) {
    res.status(500).json({ message: "Error During Placing Order", error });
  }
};

module.exports.userOrders = async (req, res) => {
  try {
    const user_id = req.session.user.id;
    const orders = await Order.find({ user: user_id })
      .populate("orderItems")
      .sort({ createdAt: -1 });

    const ordersWithReviewStatus = await Promise.all(
      orders.map(async (order) => {
        const review = await Review.findOne({ order: order._id });
        return {
          ...order,
          hasReviewed: !!review,
        };
      }),
    );

    res.status(200).json({ orders: ordersWithReviewStatus });
  } catch (error) {
    res.status(500).json({ message: "Error During Fetching Orders", error });
  }
};
