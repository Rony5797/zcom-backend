const express = require("express");
const {
  Login,
  verifyOTP,
  LogOut,
} = require("../controller/userController");
const AuthVerification = require("../middleware/AuthVerification");
const router = express.Router();

router.get("/login/:email", Login);

router.get("/verifyOTP/:email/:otp", verifyOTP);

router.get("/logout", LogOut);

module.exports = router;
