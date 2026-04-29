// route/book.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const BookOrder = require("../models/BookOrder");
const Review = require("../models/Review");

// =========================
// BOOK PRICES
// =========================
const prices = {
  book1: 400, // $4.0.00
  book2: 420, // $4.2.00
  book2: 530, // $5.3.00
};

// =========================
// CREATE CHECKOUT SESSION
// =========================
router.post("/purchase", async (req, res) => {
  try {
    const { email, bookId } = req.body;

    if (!email || !bookId) {
      return res.status(400).json({ error: "Missing email or bookId" });
    }

    if (!prices[bookId]) {
      return res.status(400).json({ error: "Invalid book selected" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      metadata: { bookId },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Book: ${bookId}`,
            },
            unit_amount: prices[bookId],
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/book-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/books`,
    });

    return res.status(200).json({ url: session.url });

  } catch (err) {
    console.error("[PURCHASE] Failed:", err.message, err);
    return res.status(500).json({ error: "Checkout session creation failed" });
  }
});

// =========================
// VERIFY SESSION
// =========================
router.get("/verify-session", async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id)
      return res.status(400).json({ error: "Missing session_id" });

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    const { bookId } = session.metadata;
    const email = session.customer_email;

    let order = await BookOrder.findOne({ email, bookId });

    if (!order) {
      const downloadToken = Math.random().toString(36).substring(2, 15);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);

      order = await BookOrder.create({
        email,
        bookId,
        downloadToken,
        expiryDate,
      });
    }

    res.json({
      downloadUrl: `${process.env.SERVER_URL}/api/books/download/${order.downloadToken}`,
      bookId,
      email,
    });

  } catch (err) {
    console.error("[VERIFY] Failed:", err.message, err);
    res.status(500).json({ error: "Verification failed" });
  }
});

// =========================
// DOWNLOAD
// =========================
router.get("/download/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const order = await BookOrder.findOne({ downloadToken: token });

    if (!order) return res.status(403).json({ error: "Invalid link" });
    if (new Date() > order.expiryDate)
      return res.status(403).json({ error: "Link expired" });

    res.redirect(`/pdfs/${order.bookId}.pdf`);

  } catch (err) {
    console.error("[DOWNLOAD] Failed:", err.message, err);
    res.status(500).json({ error: "Download failed" });
  }
});

// =========================
// REVIEW
// =========================
router.post("/review", async (req, res) => {
  try {
    const { email, bookId, rating, comment } = req.body;

    const purchased = await BookOrder.findOne({ email, bookId });
    if (!purchased)
      return res.status(403).json({
        error: "You must purchase this book before reviewing.",
      });

    const review = await Review.create({ email, bookId, rating, comment });
    res.json(review);

  } catch (err) {
    console.error("[REVIEW] Failed:", err.message, err);
    res.status(500).json({ error: "Review failed" });
  }
});

// =========================
// GET REVIEWS
// =========================
router.get("/reviews/:bookId", async (req, res) => {
  try {
    const reviews = await Review.find({
      bookId: req.params.bookId,
    }).sort({ createdAt: -1 });

    res.json(reviews);

  } catch (err) {
    console.error("[GET REVIEWS] Failed:", err.message, err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;

                                                                                                                                                                                                                                                                                           