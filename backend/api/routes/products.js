const express = require("express");
const router = express.Router();
const { getProduct } = require("../controllers/products");

router.get("/:productName", getProduct);

module.exports = router;
