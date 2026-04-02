const mongoose = require("mongoose");

const BookOrderSchema = new mongoose.Schema(
  {
    email: { type: String, required: true },
    bookId: { type: String, required: true },
    paymentIntentId: { type: String, required: true },
    downloadToken: { type: String },
    expiryDate: { type: Date },
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookOrder", BookOrderSchema);