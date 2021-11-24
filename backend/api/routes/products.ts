import express from "express";
import productController from "../controllers/products";

const router = express.Router();

router.get("/:productName", productController.getProductByName);
router.get("/byId/:productId", productController.getProductById);

export = router;
