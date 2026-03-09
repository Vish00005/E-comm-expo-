const express = require("express");
const router = express.Router();

const User = require("../models/user"); // import model

router.post("/google", async (req, res) => {
  try {
    const { name, email, photo, uid } = req.body;

    // check if user already exists
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

    res.status(200).json({
      message: "User saved successfully",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
    });
  }
});

module.exports = router;
