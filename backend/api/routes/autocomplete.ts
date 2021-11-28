import express from "express";
import { getSearchResults } from "../controllers/autocomplete";

const router = express.Router();

router.post("/", getSearchResults);

export = router;
