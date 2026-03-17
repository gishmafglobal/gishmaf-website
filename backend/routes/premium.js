const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const PremiumUser = require("../models/PremiumUser");

// ======================================
// CREATE PREMIUM SUBSCRIPTION SESSION
// ======================================
router.post("/create-premium-session", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: "Missing STRIPE_SECRET_KEY" });
    }

    if (!process.env.STRIPE_PRICE_ID) {
      return res.status(500).json({ error: "Missing STRIPE_PRICE_ID" });
    }

    if (!process.env.FRONTEND_URL) {
      return res.status(500).json({ error: "Missing FRONTEND_URL" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],

      customer_email: email,

      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],

      success_url: `${process.env.FRONTEND_URL}/premium-success`,
      cancel_url: `${process.env.FRONTEND_URL}/premium`,
    });

    return res.json({ url: session.url });

  } catch (error) {
    console.error("🔥 STRIPE ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
});

// ======================================
// CHECK IF USER IS PREMIUM
// ======================================
router.get("/check/:email", async (req, res) => {
  try {
    const user = await PremiumUser.findOne({
      email: req.params.email,
      status: "active",
    });

    return res.json({ premium: !!user });

  } catch (error) {
    console.error("🔥 CHECK PREMIUM ERROR:", error);
    return res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;