const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const User = require("../models/User"); // make sure you have a User model

// Create subscription checkout session
router.post("/create-session", async (req, res) => {
  const { userId } = req.body;

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card", "apple_pay", "google_pay"],
      mode: "subscription",
      line_items: [
        {
          price: "prod_U3zZm2voQtGjMn", // replace with Stripe Price ID for subscription
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/subscription-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/subscription-cancel`,
      metadata: { userId },
    });

    res.json({ url: session.url });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Unable to create checkout session" });
  }
});

module.exports = router;