const { Cart } = require("../models/cart");
const { Product } = require("../models/product");

module.exports.getCart = async (req, res) => {
  try {
    const user = req.session.user;
    const cart = await Cart.findOne({ user: user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    res.status(200).json(cart);
  } catch (error) {
    console.log("Error in getCart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.addToCart = async (req, res) => {
  try {
    const user = req.session.user;
    const { productId, quantity = 1 } = req.body;
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Product is out of stock" });
    }

    let cart = await Cart.findOne({ user: user.id });
    if (!cart) {
      cart = await Cart.create({
        user: user.id,
        items: [],
      });
    }
    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId,
    );
    if (existingItem) {
      const newQuantity = existingItem.quantity + Number(quantity);
      if (product.stock < newQuantity) {
        return res.status(400).json({ message: "Product is out of stock" });
      }
      existingItem.quantity = newQuantity;
    } else {
      cart.items.push({ product: productId, quantity: Number(quantity) });
    }
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log("Error in Post Cart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.updateCart = async (req, res) => {
  try {
    const { id } = req.params;
    const { quantity } = req.body;
    if (quantity < 1) {
      return res
        .status(400)
        .json({ message: "Quantity must be greater than 1" });
    }
    const cart = await Cart.findOne({ user: req.session.user.id });
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }
    const existingItem = cart.items.find(
      (item) => item.product.toString() === id,
    );
    if (!existingItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    existingItem.quantity = Number(quantity);

    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    if (product.stock < quantity) {
      return res.status(400).json({ message: "Product is out of stock" });
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log("Error in updateCart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.removeFromCart = async (req, res) => {
  try {
    const { id } = req.params;

    const cart = await Cart.findOne({ user: req.session.user.id });
    if (!cart) {
      res.status(400).json({ message: "Cart not found" });
    }
    const existingItem = cart.items.find(
      (item) => item.product.toString() === id,
    );
    if (!existingItem) {
      return res.status(404).json({ message: "Item not found" });
    }
    cart.items = cart.items.filter((item) => item.product.toString() !== id);
    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    console.log("Error in RemoveItemCart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
module.exports.clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.session.user.id });
    if (!cart) {
      res.status(400).json({ message: "Cart not found" });
    }
    cart.items = [];
    await cart.save();
    res.status(200).json({ message: "Cart cleared successfully", cart });
  } catch (error) {
    console.log("Error in ClearCart:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
