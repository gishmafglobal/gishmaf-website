const mongoose = require("mongoose");

const premiumVideoSchema = new mongoose.Schema({
  title: String,
  url: String,
  poster: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("PremiumVideo", premiumVideoSchema);