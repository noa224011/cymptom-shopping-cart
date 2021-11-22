const express = require("express");
const router = express.Router();
const { getProductByName, getProductById } = require("../controllers/products");

router.get("/:productName", getProductByName);
router.get("/byId/:productId", getProductById);

module.exports = router;
