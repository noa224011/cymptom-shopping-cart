import express from "express";
import autocompleteController from "../controllers/autocomplete";

const router = express.Router();

router.post("/", autocompleteController.getSearchResults);

export = router;
