const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// =======================
// PREMIUM SUBSCRIPTION
// =======================
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
      success_url: "https://gishmaf-website-1.onrender.com/premium-success",
      cancel_url: "http://localhost:5173/premium-cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

// =======================
// BOOK PAYMENT
// =======================
router.post("/create-book-session", async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID_BOOK,
          quantity: 1,
        },
      ],
      success_url: "http://localhost:5173/book-success",
      cancel_url: "http://localhost:5173/book-cancel",
    });

    res.json({ url: session.url });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;