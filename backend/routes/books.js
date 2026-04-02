const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const BookOrder = require("../models/BookOrder");
const Review = require("../models/Review");

// =====================================
// CREATE CHECKOUT SESSION
// =====================================
router.post("/purchase", async (req, res) => {
  try {
    const { email, bookId } = req.body;
    console.log("[PURCHASE] Request received for book:", bookId, "email:", email);

    const prices = { book1: 400, book2: 420 }; // Amount in cents (USD)

    if (!prices[bookId]) {
      console.log("[PURCHASE] Invalid bookId:", bookId);
      return res.status(400).json({ error: "Invalid book" });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("[PURCHASE] STRIPE KEY MISSING!");
      return res.status(500).json({ error: "Stripe key not set in server" });
    }
    console.log("[PURCHASE] STRIPE KEY PRESENT:", !!process.env.STRIPE_SECRET_KEY);

    console.log("[PURCHASE] Creating Stripe session...");
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      metadata: { bookId },
      line_items: [
        {
          price_data: {
            currency: "usd", // make sure this matches the Stripe price
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
    console.error("[PURCHASE] Stripe session creation failed:", err);
    res.status(500).json({ error: "Purchase failed, check server logs" });
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
    if (session.payment_status !== "paid")
      return res.status(400).json({ error: "Payment not completed" });

    const { bookId } = session.metadata;
    const email = session.customer_email;

    let order = await BookOrder.findOne({ email, bookId });
    if (!order) {
      const downloadToken = Math.random().toString(36).substring(2, 15);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7); // link valid 7 days

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
    console.error("[VERIFY] Failed to verify session:", err);
    res.status(500).json({ error: "Verification failed" });
  }
});

// =====================================
// SECURE DOWNLOAD (TOKEN BASED)
// =====================================
router.get("/download/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const order = await BookOrder.findOne({ downloadToken: token });
    if (!order) return res.status(403).json({ error: "Invalid link" });
    if (new Date() > order.expiryDate) return res.status(403).json({ error: "Link expired" });

    res.redirect(`/pdfs/${order.bookId}.pdf`);
  } catch (err) {
    console.error("[DOWNLOAD] Failed to download book:", err);
    res.status(500).json({ error: "Download failed" });
  }
});

// =====================================
// ADD REVIEW (ONLY VERIFIED BUYERS)
// =====================================
router.post("/review", async (req, res) => {
  try {
    const { email, bookId, rating, comment } = req.body;
    const purchased = await BookOrder.findOne({ email, bookId });
    if (!purchased)
      return res.status(403).json({ error: "You must purchase this book before reviewing." });

    const review = await Review.create({ email, bookId, rating, comment });
    res.json(review);
  } catch (err) {
    console.error("[REVIEW] Failed to add review:", err);
    res.status(500).json({ error: "Review failed" });
  }
});

// =====================================
// GET REVIEWS
// =====================================
router.get("/reviews/:bookId", async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("[REVIEWS] Failed to fetch reviews:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;