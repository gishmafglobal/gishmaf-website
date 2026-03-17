
const mongoose = require("mongoose");

const PremiumUserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  status: { type: String, enum: ["active", "expired", "cancelled"], default: "active" },
  stripeCustomerId: { type: String },
  stripeSubscriptionId: { type: String },
  expiresAt: { type: Date },
}, { timestamps: true });

module.exports = mongoose.model("PremiumUser", PremiumUserSchema);