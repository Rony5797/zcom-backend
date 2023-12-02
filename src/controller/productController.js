const {
  ProductBYRemark,
  ProductBYCategory,
  DetailsBYID,
  ProductBYBrand,
  ProductBYCategoryLimit10,
  ProductBYSlider,
  ProductBYKeyword,
  AllProducts,
  ProductDetails,
  AllCategories,
  AllBrands,
  FlashSale,
  AllFlashSale,
  FlashBYID,
} = require("../services/ProductServices");
const { CreateWish, RemoveWish, Wish } = require("../services/WishService");
const { CreateCart, Cart, RemoveCart } = require("../services/CartServices");

exports.ProductList = async (req, res) => {
  let result = await AllProducts(req);
  return res.status(200).json(result);
};
// exports.ProductDetail = async (req, res) => {
//   let result = await ProductDetails(req);
//   return res.status(200).json(result);
// };
exports.Category = async (req, res) => {
  let result = await AllCategories(req);
  return res.status(200).json(result);
};
exports.Brands = async (req, res) => {
  let result = await AllBrands(req);
  return res.status(200).json(result);
};
exports.SliderList = async (req, res) => {
  let result = await ProductBYSlider(req);
  return res.status(200).json(result);
};

exports.ListByCategory = async (req, res) => {
  let result = await ProductBYCategory(req);
  return res.status(200).json(result);
};

exports.ListBySmilier = async (req, res) => {
  let result = await ProductBYCategoryLimit10(req);
  return res.status(200).json(result);
};

exports.ListByBrand = async (req, res) => {
  let result = await ProductBYBrand(req);
  return res.status(200).json(result);
};

exports.ListByKeyword = async (req, res) => {
  let result = await ProductBYKeyword(req);
  return res.status(200).json(result);
};

exports.ListReview = async (req, res) => {};

exports.ProductDetails = async (req, res) => {
  let result = await DetailsBYID(req);
  return res.status(200).json(result);
};

exports.ListByRemark = async (req, res) => {
  let result = await ProductBYRemark(req);
  return res.status(200).json(result);
};

exports.WishList = async (req, res) => {
  let result = await Wish(req);
  return res.status(200).json(result);
};

exports.CreateWishList = async (req, res) => {
  let result = await CreateWish(req);
  return res.status(200).json(result);
};

exports.RemoveWishList = async (req, res) => {
  let result = await RemoveWish(req);
  return res.status(200).json(result);
};

exports.CartList = async (req, res) => {
  let result = await Cart(req);
  return res.status(200).json(result);
};

exports.CreateCartList = async (req, res) => {
  let result = await CreateCart(req);
  return res.status(200).json(result);
};

exports.RemoveCartList = async (req, res) => {
  let result = await RemoveCart(req);
  return res.status(200).json(result);
};
exports.CreateFlash = async (req, res) => {
  let result = await FlashSale(req);
  return res.status(200).json(result);
};
exports.AllFlashProduct = async (req, res) => {
  let result = await AllFlashSale(req);
  return res.status(200).json(result);
};
exports.FlashProductById = async (req, res) => {
  let result = await FlashBYID(req);
  return res.status(200).json(result);
};
