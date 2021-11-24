"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const autocomplete_1 = __importDefault(require("../controllers/autocomplete"));
const router = express_1.default.Router();
router.post("/", autocomplete_1.default.getSearchResults);
module.exports = router;
