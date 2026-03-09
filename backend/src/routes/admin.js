const express = require("express");
const { isAuth, adminOnly } = require("../middleware/auth");
const router = express.Router();

router.get("/dashboard", isAuth, adminOnly, (req, res) => {
  res.send("Admin Router");
});

module.exports = router;
