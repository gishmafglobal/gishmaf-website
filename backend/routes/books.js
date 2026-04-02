const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const BookOrder = require("../models/BookOrder");

// =====================================
// CREATE CHECKOUT SESSION WITH LOGGING
// =====================================
router.post("/purchase", async (req, res) => {
  try {
    const { email, bookId } = req.body;

    console.log("[PURCHASE] Request received:", { email, bookId });

    // Validate input
    if (!email || !bookId) {
      console.warn("[PURCHASE] Missing email or bookId");
      return res.status(400).json({ error: "Missing email or bookId" });
    }

    const prices = { 
      book1: 400,   // 4 USD in cents
      book2: 420    // 4.20 USD in cents
    };

    if (!prices[bookId]) {
      console.warn("[PURCHASE] Invalid bookId:", bookId);
      return res.status(400).json({ error: "Invalid bookId" });
    }

    console.log("[PURCHASE] Creating Stripe checkout session for", bookId, "amount:", prices[bookId]);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      metadata: { bookId },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Purchase of ${bookId}` },
            unit_amount: prices[bookId],
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/book-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/books`,
    });

    console.log("[PURCHASE] Stripe session created successfully:", session.id);

    res.json({ sessionId: session.id });
  } catch (err) {
    console.error("[PURCHASE] ERROR creating Stripe session:", err);
    res.status(500).json({ error: "Purchase failed, check server logs" });
  }
});

module.exports = router;