const { Users } = require("../models/user.js");

module.exports.addAdresses = async (req, res) => {
  try {
    const { label, fullname, street, city, state, zipCode, phone, isDefault } =
      req.body;
    let user = req.session.user;

    if (!user) {
      res.status(500).json({ message: "User Not Found" });
    }
    if (isDefault) {
      user.addresses.forEach((address) => {
        address.isDefault = false;
      });
    }
  } catch (error) {
    res.status(500).json({ message: " Error During Adding Address", error });
  }
};
module.exports.getAdresses = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: " Error During Getting Address", error });
  }
};
module.exports.updateAddress = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: " Error During Updating Address", error });
  }
};
module.exports.deleteAddress = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: " Error During Deleting Address", error });
  }
};

module.exports.addWishlist = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: " Error During Adding Wishlist", error });
  }
};
module.exports.getWishlist = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: " Error During Getting Wishlist", error });
  }
};
module.exports.deleteWishlist = async (req, res) => {
  try {
  } catch (error) {
    res.status(500).json({ message: " Error During Deleting Wishlist", error });
  }
};
