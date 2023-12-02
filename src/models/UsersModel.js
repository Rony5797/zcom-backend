const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // Ensure that each email is unique
    },
    otp: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"], // Assuming 'user' and 'admin' are the possible roles
      default: "user", // Default role is 'user'
    },
  },
  { timestamps: true, versionKey: false }
);

const User = mongoose.model("user", userSchema);

module.exports = User;
