const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const PremiumUser = require("../models/PremiumUser");

// Create Premium Subscription Session
router.post("/create-premium-session", async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ error: "Email is required" });

    if (!process.env.STRIPE_PRICE_ID_PREMIUM)
      return res.status(500).json({ error: "STRIPE_PRICE_ID_PREMIUM not set" });

    if (!process.env.FRONTEND_URL)
      return res.status(500).json({ error: "FRONTEND_URL not set" });

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      customer_email: email,
      line_items: [{ price: process.env.STRIPE_PRICE_ID_PREMIUM, quantity: 1 }],
      success_url: `${process.env.FRONTEND_URL}/premium-success`,
      cancel_url: `${process.env.FRONTEND_URL}/premium`,
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error("🔥 Premium session error:", error);
    res.status(500).json({ error: error.message });
  }
});

// Check Premium Status
router.get("/check/:email", async (req, res) => {
  try {
    const user = await PremiumUser.findOne({ email: req.params.email, status: "active" });

    if (!user) return res.json({ premium: false });

    if (user.expiresAt && user.expiresAt < new Date()) {
      user.status = "expired";
      await user.save();
      return res.json({ premium: false });
    }

    res.json({ premium: true });
  } catch (error) {
    console.error("🔥 Check premium error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;