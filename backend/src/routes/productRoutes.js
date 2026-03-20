const express = require("express");
const { allProduct } = require("../controller/admin.controller");
const { isAuth } = require("../middleware/auth");
const { getProduct } = require("../controller/product.controller");
const router = express.Router();

router.get("/", isAuth, allProduct);
router.get("/:id", isAuth, getProduct);

module.exports = router;
