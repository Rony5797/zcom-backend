const {
  allCategories,
} = require("../services/ProductServices");

exports.CategoryList = async (req, res) => {
  const result = await allCategories();
  return res.status(200).json(result);
};
