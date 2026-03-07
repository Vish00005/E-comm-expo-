const { requireAuth } = require("@clerk/express");
const User = require("../models/user");

module.exports.isAuth = [
  requireAuth(),
  async (req, res, next) => {
    try {
      const clerkId = req.auth().userId;
      if (!clerkId) return res.status(401).json({ message: "Unauthorized" });
      const user = await User.findOne({ clerkID: clerkId });
      if (!user) return res.status(404).json({ message: "User not found" });

      req.user = user;
      next();
    } catch (error) {
      console.log("Error in Protected Route:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
];

module.exports.adminOnly = (req, res, next) => {
  console.log(req.user);
  if (req.user.email !== process.env.ADMIN_EMAIL) {
    return res.status(403).json({ message: "Forbidden: Admins only" });
  }
  next();
};
