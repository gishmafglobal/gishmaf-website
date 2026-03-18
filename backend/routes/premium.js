const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// DEBUG: Check env variables on server start
console.log("🔑 STRIPE_SECRET_KEY:", process.env.STRIPE_SECRET_KEY ? "OK" : "MISSING");
console.log("💰 STRIPE_PRICE_ID_PREMIUM:", process.env.STRIPE_PRICE_ID_PREMIUM || "MISSING");

// CREATE SESSION
router.post("/create-premium-session", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      console.log("❌ No email provided");
      return res.status(400).json({ error: "Email required" });
    }

    if (!process.env.STRIPE_PRICE_ID_PREMIUM) {
      console.log("❌ PRICE ID missing in env");
      return res.status(500).json({ error: "Server misconfigured" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      customer_email: email,
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID_PREMIUM, // ✅ CORRECT NAME
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/premium-success`,
      cancel_url: `${process.env.FRONTEND_URL}/premium`,
    });

    console.log("✅ Session created:", session.url);

    res.json({ url: session.url });

  } catch (err) {
    console.error("❌ Stripe ERROR FULL:", err);
    res.status(500).json({ error: "Failed to start premium session" });
  }
});

module.exports = router;