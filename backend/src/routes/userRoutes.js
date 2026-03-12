const express = require("express");
const { isAuth } = require("../middleware/auth");
const {
  addAdresses,
  getWishlist,
  getAdresses,
  updateAddress,
  deleteAddress,
  addWishlist,
  deleteWishlist,
} = require("../controller/user.controller");
const router = express.Router();

router.use(isAuth);

router.post("/addresses", addAdresses);
router.get("/addresses", getAdresses);
router.put("/addresses/:id", updateAddress);
router.delete("/addresses/:id", deleteAddress);

router.post("/wishlist", addWishlist);
router.get("/wishlist", getWishlist);
router.delete("/wishlist/:id", deleteWishlist);
module.exports = router;
