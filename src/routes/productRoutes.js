const express = require("express");

const AuthVerification = require("../middleware/AuthVerification");
const {
  ListByCategory,
  ListBySmilier,
  ListByBrand,
  ListByRemark,
  SliderList,
  ListByKeyword,
  ProductDetails,
  WishList,
  CreateWishList,
  RemoveWishList,
  CartList,
  CreateCartList,
  RemoveCartList,
  ProductList,
  Category,
  Brands,
  CreateFlash,
  AllFlashProduct,
  FlashProductById,
} = require("../controller/productController");

const router = express.Router();

router.get("/Product", ProductList);
router.get("/Product/:id", ProductDetails);
router.get("/Categories", Category);
router.get("/Brands", Brands);
router.get("/ListByCategory/:categoryID", ListByCategory);
router.get("/ListBySmilier/:categoryID", ListBySmilier);
router.get("/ListByBrand/:brandID", ListByBrand);
router.get("/ListByRemark/:remark", ListByRemark);
router.get("/SliderList", SliderList);
router.get("/ListByKeyword/:keyword", ListByKeyword);
router.get("/ListDetails/:id", ProductDetails);
router.post("/FlashSale/:id", CreateFlash);
router.get("/FlashSale", AllFlashProduct);
router.get("/FlashSale/:id", FlashProductById);

router.get("/WishList", AuthVerification, WishList);
router.post("/CreateWishList", AuthVerification, CreateWishList);
router.post("/RemoveWishList", AuthVerification, RemoveWishList);

router.get("/CartList", AuthVerification, CartList);
router.post("/CreateCartList", AuthVerification, CreateCartList);
router.post("/RemoveCartList", AuthVerification, RemoveCartList);

module.exports = router;
