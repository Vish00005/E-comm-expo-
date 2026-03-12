const { Users } = require("../models/user.js");

module.exports.addAdresses = async (req, res) => {
  try {
    const { label, fullname, street, city, state, zipCode, phone, isDefault } =
      req.body;
    let user = req.session.user;

    if (
      !label ||
      !fullname ||
      !street ||
      !city ||
      !state ||
      !zipCode ||
      !phone
    ) {
      res.status(400).json({ message: "All fields are required" });
    }

    if (!user) {
      res.status(500).json({ message: "User Not Found" });
    }
    if (isDefault) {
      user.addresses.forEach((address) => {
        address.isDefault = false;
      });
    }
    const user_data = Users.findById(req.session.user.id);
    user_data.addresses.push({
      label,
      fullname,
      street,
      city,
      state,
      zipCode,
      phone,
      isDefault,
    });
    await user_data.save();
    res.status(200).json({
      message: "Address Added Successfully",
      addresses: user_data.addresses,
    });
  } catch (error) {
    res.status(500).json({ message: " Error During Adding Address", error });
  }
};
module.exports.getAdresses = async (req, res) => {
  try {
    const user_data = Users.findById(req.session.user.id);
    res.status(200).json({ addresses: user_data.addresses });
  } catch (error) {
    res.status(500).json({ message: " Error During Getting Address", error });
  }
};
module.exports.updateAddress = async (req, res) => {
  try {
    const { id } = req.params;

    const { label, fullname, street, city, state, zipCode, phone, isDefault } =
      req.body;

    const user_data = await Users.findById(req.session.user.id);

    const address = user_data.addresses.id(id);

    if (!address) {
      return res.status(404).json({ message: "Address not found" });
    }
    if (isDefault) {
      user_data.addresses.forEach((address) => {
        address.isDefault = false;
      });
    }
    address.label = label || address.label;
    address.fullname = fullname || address.fullname;
    address.street = street || address.street;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zipCode = zipCode || address.zipCode;
    address.phone = phone || address.phone;
    address.isDefault = isDefault || address.isDefault;

    await user_data.save();

    res.status(200).json({
      message: "Address Updated Successfully",
      addresses: user_data.addresses,
    });
  } catch (error) {
    res.status(500).json({ message: " Error During Updating Address", error });
  }
};
module.exports.deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const user_data = await Users.findById(req.session.user.id);
    user_data.addresses.pull(id);
    await user_data.save();
    res.status(200).json({
      message: "Address Deleted Successfully",
      addresses: user_data.addresses,
    });
  } catch (error) {
    res.status(500).json({ message: " Error During Deleting Address", error });
  }
};

module.exports.addWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const user_data = await Users.findById(req.session.user.id);
    user_data.wishlist.push(id);
    await user_data.save();
    res.status(200).json({
      message: "Wishlist Added Successfully",
      wishlist: user_data.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: " Error During Adding Wishlist", error });
  }
};
module.exports.getWishlist = async (req, res) => {
  try {
    const user_data = await Users.findById(req.session.user.id).populate(
      "wishlist",
    );
    res.status(200).json({
      message: "Wishlist Fetched Successfully",
      wishlist: user_data.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: " Error During Getting Wishlist", error });
  }
};
module.exports.deleteWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    const user_data = await Users.findById(req.session.user.id);
    user_data.wishlist.pull(id);
    await user_data.save();
    res.status(200).json({
      message: "Wishlist Deleted Successfully",
      wishlist: user_data.wishlist,
    });
  } catch (error) {
    res.status(500).json({ message: " Error During Deleting Wishlist", error });
  }
};
