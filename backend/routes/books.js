const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const BookOrder = require("../models/BookOrder");
const Review = require("../models/Review");

// Book prices in USD cents
const BOOK_PRICES = {
  book1: 400,   // $4.00
  book2: 420,   // $4.20
};

// =====================================
// CREATE CHECKOUT SESSION
// =====================================
router.post("/purchase", async (req, res) => {
  try {
    const { email, bookId } = req.body;
    if (!email || !bookId) return res.status(400).json({ error: "Email and bookId required" });

    const price = BOOK_PRICES[bookId];
    if (!price) return res.status(400).json({ error: "Invalid book" });

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
            unit_amount: price,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/book-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/books`,
    });

    res.json({ sessionId: session.id });
  } catch (err) {
    console.error("Stripe checkout session failed:", err.raw ? err.raw.message : err.message);
    res.status(500).json({ error: "Checkout session not created" });
  }
});

// =====================================
// VERIFY SESSION & RETURN DOWNLOAD
// =====================================
router.get("/verify-session", async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ error: "Missing session_id" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (!session || session.payment_status !== "paid")
      return res.status(400).json({ error: "Payment not completed" });

    const { bookId } = session.metadata;
    const email = session.customer_email;

    let order = await BookOrder.findOne({ email, bookId });
    if (!order) {
      const downloadToken = Math.random().toString(36).substring(2, 15);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7); // link valid 7 days

      order = await BookOrder.create({ email, bookId, downloadToken, expiryDate });
    }

    res.json({
      downloadUrl: `${process.env.SERVER_URL}/api/books/download/${order.downloadToken}`,
      bookId,
      email,
    });
  } catch (err) {
    console.error("Verify session failed:", err.message);
    res.status(500).json({ error: "Verification failed" });
  }
});

// =====================================
// SECURE DOWNLOAD
// =====================================
router.get("/download/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const order = await BookOrder.findOne({ downloadToken: token });
    if (!order) return res.status(403).json({ error: "Invalid link" });
    if (new Date() > order.expiryDate) return res.status(403).json({ error: "Link expired" });

    res.redirect(`/pdfs/${order.bookId}.pdf`);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Download failed" });
  }
});

// =====================================
// REVIEWS
// =====================================
router.post("/review", async (req, res) => {
  try {
    const { email, bookId, rating, comment } = req.body;
    const purchased = await BookOrder.findOne({ email, bookId });
    if (!purchased) return res.status(403).json({ error: "You must purchase this book before reviewing." });

    const review = await Review.create({ email, bookId, rating, comment });
    res.json(review);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Review failed" });
  }
});

router.get("/reviews/:bookId", async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;