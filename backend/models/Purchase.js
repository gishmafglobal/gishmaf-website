const mongoose = require("mongoose");

const purchaseSchema = new mongoose.Schema({
  email: String,
  bookId: String,
  purchaseDate: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Purchase", purchaseSchema);