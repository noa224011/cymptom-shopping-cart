import express from "express";
import { getProductByName, getProductById } from "../controllers/products";

const router = express.Router();

router.get("/:productName", getProductByName);
router.get("/byId/:productId", getProductById);

export = router;
