const mongoose = require("mongoose");

const bookOrderSchema = new mongoose.Schema({
  email: String,
  bookId: String,
  paymentIntentId: String,

  status: {
    type: String,
    default: "paid",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("BookOrder", bookOrderSchema);