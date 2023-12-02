const userOTPServices = async (email, code, dataModel) => {
  return await dataModel.updateOne(
    { email: email },
    { $set: { otp: code } },
    { upsert: true }
  );
};

module.exports = userOTPServices;
