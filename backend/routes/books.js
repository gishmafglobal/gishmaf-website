const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const BookOrder = require("../models/BookOrder");
const Review = require("../models/Review");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ===================== PURCHASE =====================
router.post("/purchase", async (req, res) => {
  try {
    const { email, bookId } = req.body;
    console.log("📥 Purchase:", email, bookId);

    if (!email || !bookId) {
      return res.status(400).json({ error: "Missing email or bookId" });
    }

    const prices = { book1: 400, book2: 420 };

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: email,
      metadata: { bookId },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Book ${bookId}` },
            unit_amount: prices[bookId],
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/book-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/books`,
    });

    console.log("✅ Session:", session.id);

    res.json({ sessionId: session.id });
  } catch (err) {
    console.error("🔥 Purchase error:", err);
    res.status(500).json({ error: err.message });
  }
});

// ===================== REVIEWS =====================
router.get("/reviews/:bookId", async (req, res) => {
  try {
    console.log("📥 Fetch reviews:", req.params.bookId);

    const reviews = await Review.find({
      bookId: req.params.bookId,
    });

    res.json(reviews);
  } catch (err) {
    console.error("🔥 Review fetch error:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

// ===================== ADD REVIEW =====================
router.post("/review", async (req, res) => {
  try {
    const { email, bookId, rating, comment } = req.body;

    const review = await Review.create({
      email,
      bookId,
      rating,
      comment,
    });

    console.log("✅ Review added");

    res.json(review);
  } catch (err) {
    console.error("🔥 Review error:", err);
    res.status(500).json({ error: "Failed to add review" });
  }
});

module.exports = router;