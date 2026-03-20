const express = require("express");
const { isAuth } = require("../middleware/auth");
const { createReview } = require("../controller/review.controller");
const router = express.Router();

router.post("/", isAuth, createReview);

module.exports = router;
