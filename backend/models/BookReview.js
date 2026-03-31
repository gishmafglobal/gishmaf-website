const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  comment: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Export the model as BookReview to match router import
module.exports = mongoose.model("BookReview", reviewSchema);