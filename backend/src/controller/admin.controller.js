const { cloudinary } = require("../config/cloud");
const { Product } = require("../models/product");
const { Orders } = require("../models/order");
const { Users } = require("../models/user");

module.exports.createProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;
    if (!name || !price || !description || !category || !stock) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({ message: "Images are required" });
    }
    if (files.length > 3) {
      return res.status(400).json({ message: "Max 3 Images only" });
    }

    const uploadPromises = req.files.map((file) => {
      return cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
    });
    const uploadResults = await Promise.all(uploadPromises);

    const imageUrls = uploadResults.map((result) => result.secure_url);

    const product = new Product({
      name,
      price: parseFloat(price),
      description,
      category,
      stock: parseInt(stock),
      images: imageUrls,
    });
    await product.save();
    return res
      .status(201)
      .json({ message: "Product created successfully", product });
  } catch (error) {
    console.error(`Error:${error.message}`);
    return res
      .status(500)
      .json({ message: `Error while Creating Product : ${error.message}` });
  }
};

module.exports.allProduct = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    return res.status(200).json(products);
  } catch (error) {
    console.error(`Error:${error.message}`);
    return res.status(500).json({ message: "Error while fetching products" });
  }
};

module.exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, description, category, stock } = req.body;
    const product = await Product.findById(id);
    if (!product) {
      return res
        .status(500)
        .json({ message: `Error in editing : ${error.message}` });
    }
    if (name) product.name = name;
    if (price) product.price = price;
    if (description) product.description = description;
    if (category) product.category = category;
    if (stock) product.stock = stock;

    if (req.files && req.files.length > 0);
    if (req.files.length > 3) {
      return res.status(400).json({ message: "Maximum 3 images allowed" });
    }

    const uploadPromises = req.files.map((file) => {
      return cloudinary.uploader.upload(file.path, {
        folder: "products",
      });
    });

    const uploadResults = await Promise.all(uploadPromises);
    product.images = uploadResults.map((result = result.secure_url));

    await product.save();

    res.status(200).json(product);
  } catch (error) {
    console.error(`Error:${error.message}`);
    return res.status(500).json({ message: "Error while updating products" });
  }
};

// module.exports.deleteProduct = async (req, res) => {};

module.exports.allOrders = async (req, res) => {
  try {
    const orders = await Orders.find()
      .populate("user", "name email")
      .populate("orderItems.product")
      .sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error(`Error:${error.message}`);
    return res
      .status(500)
      .json({ message: "Error while Getting Orders", error });
  }
};

module.exports.updateOrders = async (req, res) => {
  try {
    const { orderId } = req.params;
    const { status } = req.body;

    if (!["pending", "shipped", "delivered"].includes(status)) {
      return res.status(500).json({ message: `Invalid Status` });
    }
    const order = await Orders.findById(orderId);
    if (!orders) {
      return res.status(500).json({ message: `OrderId Incorrect` });
    }

    order.status = status;
    if (status === "shipped" && !order.shippedAt) {
      order.shippedAt = new Date();
    }
    if (status === "delivered" && !order.deliveredAt) {
      order.deliveredAt = new Date();
    }

    await order.save();

    res.status(200).json({ message: "Order Updated Succesfully", order });
  } catch (error) {
    console.error(`Error:${error.message}`);
    return res
      .status(500)
      .json({ message: "Error while Updating Order", error });
  }
};

module.exports.getCustomers = async (req, res) => {
  try {
    const customers = await Users.find().sort({ createdAt: -1 });
    res.status(200).json({ customers });
  } catch (error) {
    console.error(`Error:${error.message}`);
    return res
      .status(500)
      .json({ message: "Error while Getting Customers", error });
  }
};
module.exports.getStats = async (req, res) => {
  try {
    const totalOrders = await Orders.countDocuments();
    const revenueResult = await Orders.aggregate([
      {
        $group: {
          _id: null,
          total: { $sum: "$totalPrice" },
        },
      },
    ]);

    const totalRevnue = revenueResult?.total || 0;
    const totalCustomers = await Users.countDocuments();
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      totalOrders,
      totalRevnue,
      totalCustomers,
      totalProducts,
    });
  } catch (error) {
    console.error(`Error:${error.message}`);
    return res
      .status(500)
      .json({ message: "Error while Getting Stats", error });
  }
};
