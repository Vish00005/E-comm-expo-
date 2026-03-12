const express = require("express");
const { isAuth, adminOnly } = require("../middleware/auth");
const upload = require("../middleware/multer.middleware");
const router = express.Router();
const {
  createProduct,
  allProduct,
  updateProduct,
  allOrders,
  updateOrders,
  getCustomers,
  getStats,
} = require("../controller/admin.controller");

router.use(isAuth, adminOnly);

router.get("/dashboard", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ message: "Not logged in" });
  }

  res.json(req.session.user);
});
router.post("/products", upload.array("images", 3), createProduct);
router.get("/products", allProduct);
router.put("/products/:id", upload.array("images", 3), updateProduct);
// router.delete("/products/:id", deleteProduct);

router.get("/orders", allOrders);
router.patch("/orders/:orderid/status", updateOrders);

router.get("/customers", getCustomers);
router.get("/stats", getStats);
module.exports = router;
