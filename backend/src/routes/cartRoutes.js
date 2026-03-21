const express = require("express");
const router = express.Router();
const { isAuth } = require("../middleware/auth.js");
const {
  getCart,
  addToCart,
  updateCart,
  removeFromCart,
  clearCart,
} = require("../controller/cart.controller.js");

router.use(isAuth);

router.get("/", getCart);
router.post("/add", addToCart);
router.put("/:id", updateCart);
router.delete("/:id", removeFromCart);
router.delete("/", clearCart);

module.exports = router;
