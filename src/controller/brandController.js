const { allBrands } = require("../services/ProductServices");

exports.BrandList = async (req, res) => {
  const result = await allBrands();
  return res.status(200).json(result);
};
