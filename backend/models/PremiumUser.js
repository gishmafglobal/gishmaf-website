// const mongoose = require("mongoose");

// const premiumUserSchema = new mongoose.Schema({
//   email: {
//     type: String,
//     required: true
//   },

//   stripeCustomerId: String,

//   subscriptionId: String,

//   status: {
//     type: String,
//     default: "active"
//   },

//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("PremiumUser", premiumUserSchema);

const mongoose = require("mongoose");

const premiumUserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },

  stripeCustomerId: String,
  stripeSubscriptionId: String,

  status: {
    type: String,
    default: "active",
  },

  expiresAt: Date, // ✅ NEW (30 days control)

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("PremiumUser", premiumUserSchema);