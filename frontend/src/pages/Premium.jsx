const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Premium subscription route
router.post("/create-premium-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID_PREMIUM,
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/premium-success`,
      cancel_url: `${process.env.FRONTEND_URL}/premium`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe premium error:", error);
    res.status(500).json({ error: "Failed to create premium session" });
  }
});

module.exports = router;