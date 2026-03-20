const { Orders } = require("../models/order");
const { Product } = require("../models/product");

module.exports.createReview = async (req, res) => {
  try {
    const { productId, orderId, rating } = req.body;
    if (!rating || rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ message: "Rating must be between 1 and 5" });
    }
    const user = req.session.user.id;
    const order = await Orders.findById(orderId);
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    if (order.user.toString() !== user) {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only review your own orders" });
    }
    if (order.status !== "Delivered") {
      return res
        .status(403)
        .json({ message: "Forbidden: You can only review delivered orders" });
    }
    const productInOrder = order.orderItems.find(
      (item) => item.product.toString() === productId,
    );
    if (!productInOrder) {
      return res.status(404).json({ message: "Product not found in order" });
    }

    const existingreview = await Review.findOne({ productId, user });
    if (existingreview) {
      return res
        .status(400)
        .json({ message: "You have already reviewed this product" });
    }
    const review = new Review({
      productId,
      orderId,
      rating,
      user,
    });

    const product = await Product.findById(productId);
    const reviews = await Review.find({ productId });
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    product.rating = totalRating / reviews.length;
    await product.save();
    await review.save();
    res.status(201).json({ message: "Review created successfully", review });
  } catch (error) {
    console.log("Error in getProduct:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
