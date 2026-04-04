const mongoose = require("mongoose");

const premiumUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },

    status: {
      type: String,
      enum: ["active", "inactive", "cancelled"],
      default: "active",
    },

    stripeCustomerId: String,
    stripeSubscriptionId: String,

    expiresAt: Date,
  },
  { timestamps: true }
);

module.exports = mongoose.model("PremiumUser", premiumUserSchema);