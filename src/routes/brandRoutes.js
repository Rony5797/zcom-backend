const express = require("express");

const { BrandList } = require("../controller/brandController");
const router = express.Router();

// Brand Category
router.get("/BrandList", BrandList);

module.exports = router;
