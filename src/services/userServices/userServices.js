const userOTPServices = require("./otpSendServices");
const userVerifyService = require("./otpVerifyServices");
const sendEmailUtility = require("../../util/sendEmailUtility");
const UserModel = require("../../models/UsersModel");
const ProfileModel = require("../../models/UserProfileModel");

const { EncodeToken } = require("../../util/TokenHelper");

const userLogin = async (req) => {
  try {
    const email = req.params.email;

    const OTPCode = Math.floor(100000 + Math.random() * 900000);

    // send email
    const sendMail = await sendEmailUtility(
      email,
      "Your PIN code is = " + OTPCode,
      "Email Verification From zCom Shop"
    );
    await userOTPServices(email, OTPCode, UserModel);

    return { status: "success", data: "6 Digit OTP send your Email" };
  } catch (e) {
    return { error: "Internal Server Error" };
  }
};

const userVerify = async (req, res) => {
  try {
    const email = req.params.email;
    const OTPCode = req.params.otp;

    if (OTPCode === "0") {
      return { status: "fail", data: "Invalid OTP Code" };
    } else {
      const verify = await userVerifyService(email, OTPCode, UserModel);

      if (verify === 1) {
        const user_id = await UserModel.find({
          email: email,
          otp: OTPCode,
        }).select("_id");

        // create JWT Token
        const token = EncodeToken(email, user_id[0]["_id"].toString());

        await userOTPServices(email, "0", UserModel);

        return { status: "success", message: "Verify Success", token };
      } else {
        return { status: "fail", data: "Invalid OTP Code" };
      }
    }
  } catch (e) {
    return { error: "Internal Server Error" };
  }
};

// User Profile (Create,Read,Update)

// Profile Create & Update

const UserProfileSave = async (req) => {
  try {
    let user_id = req.headers.id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await ProfileModel.updateOne(
      { userID: user_id },
      { $set: reqBody },
      { upsert: true }
    );
    return { status: "success", message: "Profile Save Changed" };
  } catch (e) {
    console.error("Error in updating profile:", e); // Log the error for debugging
    return { status: "fail", message: "Something Went Wrong" };
  }
};

// User Profile Read

const UserProfileDetails = async (req) => {
  try {
    let user_id = req.headers.id;
    let data = await ProfileModel.find({ userID: user_id });
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: "Something Went Wrong" };
  }
};

module.exports = { userLogin, userVerify, UserProfileSave, UserProfileDetails };
