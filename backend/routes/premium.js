// const express = require("express");
// const router = express.Router();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const PremiumUser = require("../models/PremiumUser");

// // ======================================
// // CREATE PREMIUM SUBSCRIPTION SESSION
// // ======================================
// router.post("/create-premium-session", async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ error: "Email is required" });
//     }

//     if (!process.env.STRIPE_PRICE_ID_PREMIUM) {
//       return res.status(500).json({ error: "Stripe premium price ID not set" });
//     }

//     if (!process.env.FRONTEND_URL) {
//       return res.status(500).json({ error: "Frontend URL not set" });
//     }

//     // Create Stripe Checkout session for subscription
//     const session = await stripe.checkout.sessions.create({
//       mode: "subscription",
//       payment_method_types: ["card"],
//       customer_email: email,
//       line_items: [
//         {
//           price: process.env.STRIPE_PRICE_ID_PREMIUM, // ✅ Must be recurring subscription price
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.FRONTEND_URL}/premium-success`,
//       cancel_url: `${process.env.FRONTEND_URL}/premium`,
//     });

//     return res.json({ url: session.url });
//   } catch (error) {
//     console.error("🔥 Premium session error:", error.message);
//     res.status(500).json({ error: "Failed to start premium session. Try again." });
//   }
// });

// // ======================================
// // CHECK PREMIUM STATUS
// // ======================================
// router.get("/check/:email", async (req, res) => {
//   try {
//     const user = await PremiumUser.findOne({ email: req.params.email, status: "active" });

//     if (!user) return res.json({ premium: false });

//     // Check expiry (30 days)
//     if (user.expiresAt && user.expiresAt < new Date()) {
//       user.status = "expired";
//       await user.save();
//       return res.json({ premium: false });
//     }

//     res.json({ premium: true });
//   } catch (error) {
//     console.error("🔥 Check premium error:", error.message);
//     res.status(500).json({ error: "Server error" });
//   }
// });

// module.exports = router;

// routes/premium.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// This is your "check" route
router.get("/check/:email", async (req, res) => {
  const { email } = req.params;
  // TODO: replace with real DB lookup for premium users
  const isPremium = false; // example
  res.json({ premium: isPremium });
});

// This route creates a premium checkout session
router.post("/create-premium-session", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) return res.status(400).json({ error: "Email is required" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email,
      line_items: [
        {
          price: process.env.STRIPE_PREMIUM_PRICE_ID, // set this in .env
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/premium-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/premium-cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("Error creating premium session:", err.message || err);
    res.status(500).json({ error: "Failed to start premium session" });
  }
});

module.exports = router;