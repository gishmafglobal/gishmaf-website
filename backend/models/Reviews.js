const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  bookId: String,
  email: String,
  rating: Number,
  comment: String,
  verified: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Review", reviewSchema);