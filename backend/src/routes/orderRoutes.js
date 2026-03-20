const express = require("express");
const { isAuth } = require("../middleware/auth");
const { createOrder, userOrders } = require("../controller/order.controller");
const router = express.Router();

router.use(isAuth);

router.post("/createOrder", createOrder);
router.get("/myOrders", userOrders);
module.exports = router;
