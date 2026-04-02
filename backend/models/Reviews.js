const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    bookId: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Review", ReviewSchema);