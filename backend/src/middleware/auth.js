const { Users } = require("../models/user");

module.exports.isAuth = async (req, res, next) => {
  try {
    if (!req.session.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const user = await Users.findById(req.session.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in Protected Route:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports.adminOnly = (req, res, next) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (req.session.user.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }

  next();
};
