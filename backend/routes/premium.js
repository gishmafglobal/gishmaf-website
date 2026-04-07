const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const PremiumUser = require("../models/PremiumUser");

// =========================
// CHECK PREMIUM STATUS
// =========================
router.get("/check/:email", async (req, res) => {
  try {
    const user = await PremiumUser.findOne({
      email: req.params.email,
      status: "active",
    });

    res.json({ premium: !!user });
  } catch (err) {
    console.error("❌ Premium check error:", err);
    res.status(500).json({ error: err.message });
  }
});

// =========================
// CREATE PREMIUM CHECKOUT SESSION
// =========================
router.post("/create-premium-session", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    console.log("📥 Creating premium session for:", email);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Premium Subscription (30 days)",
            },
            unit_amount: 1000, // $10 (adjust if needed)
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.FRONTEND_URL}/premium-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/premium`,
    });

    console.log("✅ Premium session created:", session.id);

    res.json({ url: session.url });

  } catch (err) {
    console.error("🔥 Premium session error:", err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;