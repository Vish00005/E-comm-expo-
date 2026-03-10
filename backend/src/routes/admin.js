const express = require("express");
const { isAuth, adminOnly } = require("../middleware/auth");
const router = express.Router();

router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.json(req.session.user);
});

module.exports = router;
