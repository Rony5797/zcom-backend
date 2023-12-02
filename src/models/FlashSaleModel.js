const mongoose = require("mongoose");

const flashSaleSchema = new mongoose.Schema(
  {
    productID: { type: mongoose.Schema.Types.ObjectId, required: true },

    startTime: {
      type: Date,
      required: true,
    },
    endTime: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const FlashSale = mongoose.model("flashsales", flashSaleSchema);

module.exports = FlashSale;
