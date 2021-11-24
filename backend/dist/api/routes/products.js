"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const products_1 = __importDefault(require("../controllers/products"));
const router = express_1.default.Router();
router.get("/:productName", products_1.default.getProductByName);
router.get("/byId/:productId", products_1.default.getProductById);
module.exports = router;
