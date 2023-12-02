const mongoose = require("mongoose");

const newArrivalSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // Reference to the Product model
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
});

const NewArrival = mongoose.model("NewArrival", newArrivalSchema);

module.exports = NewArrival;
