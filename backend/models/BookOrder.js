// const mongoose = require("mongoose");

// const BookOrderSchema = new mongoose.Schema({
//   email: { type: String, required: true },
//   bookId: { type: String, required: true },
//   paymentIntentId: { type: String },
//   createdAt: { type: Date, default: Date.now },
// });

// module.exports = mongoose.model("BookOrder", BookOrderSchema);

const mongoose = require("mongoose");

const bookOrderSchema = new mongoose.Schema(
  {
    email: String,
    bookId: String,
    paymentIntentId: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("BookOrder", bookOrderSchema);