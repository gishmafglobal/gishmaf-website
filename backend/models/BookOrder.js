const mongoose = require("mongoose");

const bookOrderSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  bookId: {
    type: String,
    required: true,
  },
  paymentIntentId: String,

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BookOrder", bookOrderSchema);