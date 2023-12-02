const CategoryModel = require("../models/CategoryModel");
const BrandModel = require("../models/BrandModel");
const ProductModel = require("../models/ProductModel");
const ProductDetailModel = require("../models/ProductDetailModel");
const FlashModel = require("../models/FlashSaleModel");
const mongoose = require("mongoose");
const ProductSliderModel = require("../models/ProductSliderModel");

const ObjectId = mongoose.Types.ObjectId;

const AllProducts = async () => {
  try {
    let data = await ProductModel.find({});
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: "Something Went Wrong" };
  }
};
const ProductDetails = async (req) => {
  try {
    let ID = new ObjectId(req.params.id);

    let matchStage = { $match: { productID: ID } };
    let JoinStage1 = {
      $lookup: {
        from: "productdetails",
        localField: "productID",
        foreignField: "_id",
        as: "details",
      },
    };

    let projectionStage = {
      $project: {
        details: 0,
        _id: 0,
      },
    };
    const data = await ProductDetailModel.aggregate([
      matchStage,
      JoinStage1,
      projectionStage,
    ]);

    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: "Something Went Wrong" };
  }
};
const AllCategories = async () => {
  try {
    let data = await CategoryModel.find();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: "Something Went Wrong" };
  }
};

const AllBrands = async () => {
  try {
    let data = await BrandModel.find();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: "Something Went Wrong" };
  }
};

const ProductBYRemark = async (req) => {
  try {
    let remark = req.params.remark;
    let JoinStage1 = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let matchStage = { $match: { remark: remark } };
    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };
    let data = await ProductModel.aggregate([
      matchStage,
      JoinStage1,
      JoinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const ProductBYCategory = async (req) => {
  try {
    let categoryID = new ObjectId(req.params.categoryID);
    let JoinStage1 = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let matchStage = { $match: { categoryID: categoryID } };
    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };
    let data = await ProductModel.aggregate([
      matchStage,
      JoinStage1,
      JoinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const ProductBYBrand = async (req) => {
  try {
    let brandID = new ObjectId(req.params.brandID);
    let JoinStage1 = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let matchStage = { $match: { brandID: brandID } };
    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };
    let data = await ProductModel.aggregate([
      matchStage,
      JoinStage1,
      JoinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const ProductBYCategoryLimit10 = async (req) => {
  try {
    let categoryID = new ObjectId(req.params.categoryID);
    let JoinStage1 = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let matchStage = { $match: { categoryID: categoryID } };
    let limit = { $limit: 10 };
    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };
    let data = await ProductModel.aggregate([
      matchStage,
      limit,
      JoinStage1,
      JoinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const ProductBYSlider = async (req) => {
  try {
    let matchStage = { $match: {} };
    let limit = { $limit: 5 };
    let data = await ProductSliderModel.aggregate([matchStage, limit]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const ProductBYKeyword = async (req) => {
  try {
    let SearchRegex = { $regex: req.params.keyword, $options: "i" };
    let SearchParam = [{ title: SearchRegex }, { shortDes: SearchRegex }];
    let SearchQuery = { $or: SearchParam };
    let matchStage = { $match: SearchQuery };
    let JoinStage1 = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        categoryID: 0,
        brandID: 0,
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };
    let data = await ProductModel.aggregate([
      matchStage,
      JoinStage1,
      JoinStage2,
      unwindCategoryStage,
      unwindBrandStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const DetailsBYID = async (req) => {
  try {
    let ProductID = new ObjectId(req.params.id);

    let JoinStage1 = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinStage3 = {
      $lookup: {
        from: "productdetails",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };

    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        "details._id": 0,
        "details.productID": 0,
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };
    let unwindDetailsStage = { $unwind: "$details" };

    let matchStage = { $match: { _id: ProductID } };

    let data = await ProductModel.aggregate([
      matchStage,
      JoinStage1,
      JoinStage2,
      JoinStage3,
      unwindCategoryStage,
      unwindBrandStage,
      unwindDetailsStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const FlashSale = async (req) => {
  try {
    let ID = req.params.id;

    let { startTime, endTime } = req.body;

    let productData = await ProductModel.findById(ID);
    let exixtFlash = await FlashModel.find({ productID: productData._id });

    if (exixtFlash.length > 0) {
      return { status: "fail", data: "This product already in flash sale" };
    }
    const data = new FlashModel({
      productID: productData._id,
      startTime,
      endTime,
    });
    await data.save();
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const AllFlashSale = async () => {
  try {
    const flashProduct = await FlashModel.find({});
    return { status: "success", data: flashProduct };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

const FlashBYID = async (req) => {
  try {
    let ProductID = new ObjectId(req.params.id);

    const expiredFlashSales = await FlashModel.find({
      endTime: { $lte: new Date() },
    });
    if (expiredFlashSales.length > 0) {
      for (const flashSale of expiredFlashSales) {
        await FlashModel.deleteOne(flashSale);
      }
      return { status: "success", data: "This flash sale is timeout" };
    }
    console.log(expiredFlashSales);
    let JoinStage1 = {
      $lookup: {
        from: "categories",
        localField: "categoryID",
        foreignField: "_id",
        as: "category",
      },
    };
    let JoinStage2 = {
      $lookup: {
        from: "brands",
        localField: "brandID",
        foreignField: "_id",
        as: "brand",
      },
    };
    let JoinStage3 = {
      $lookup: {
        from: "flashsales",
        localField: "_id",
        foreignField: "productID",
        as: "details",
      },
    };

    let projectionStage = {
      $project: {
        "category._id": 0,
        "brand._id": 0,
        "details._id": 0,
        "details.productID": 0,
        "details.createdAt": 0,
        "details.updatedAt": 0,
      },
    };
    let unwindCategoryStage = { $unwind: "$category" };
    let unwindBrandStage = { $unwind: "$brand" };
    let unwindDetailsStage = { $unwind: "$details" };

    let matchStage = { $match: { _id: ProductID } };

    let data = await ProductModel.aggregate([
      matchStage,
      JoinStage1,
      JoinStage2,
      JoinStage3,
      unwindCategoryStage,
      unwindBrandStage,
      unwindDetailsStage,
      projectionStage,
    ]);
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.toString() };
  }
};

module.exports = {
  AllProducts,
  ProductDetails,
  DetailsBYID,
  AllCategories,
  AllBrands,
  ProductBYRemark,
  ProductBYCategory,
  ProductBYBrand,
  ProductBYCategoryLimit10,
  ProductBYSlider,
  ProductBYKeyword,
  FlashSale,
  AllFlashSale,
  FlashBYID,
};
