const express = require("express");
const router = express.Router();

const { Users } = require("../models/user"); // import model

router.post("/google", async (req, res) => {
  try {
    const { name, email, photo, uid } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
      user = new User({
        name,
        email,
        photo,
        googleId: uid,
      });
      await user.save();
    }

    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
    };

    req.session.save((err) => {
      if (err) {
        console.error("Session save error:", err);
        return res.status(500).json({ message: "Session save error" });
      }

      if (user.email === process.env.ADMIN_EMAIL) {
        return res.json({ role: "admin" });
      }
      return res.json({ role: "user" });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
