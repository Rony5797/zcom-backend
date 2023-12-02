const {
  userLogin,
  userVerify,
} = require("../services/userServices/userServices");

// user Login process
exports.Login = async (req, res) => {
  const result = await userLogin(req);
  return res.status(200).json(result);
};

// user Verify process
exports.verifyOTP = async (req, res) => {
  const result = await userVerify(req);
  return res.status(200).json(result);
};

// user Logout process
exports.LogOut = async (req, res) => {
  try {
    res.status(200).json({ data: "User Logout" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
