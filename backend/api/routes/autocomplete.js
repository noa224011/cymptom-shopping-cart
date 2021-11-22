const express = require("express");
const router = express.Router();
const { getSearchResults } = require("../controllers/autocomplete");

router.post("/", getSearchResults);

module.exports = router;
