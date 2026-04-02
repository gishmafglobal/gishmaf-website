const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

// 🔹 Use your backend STRIPE_SECRET_KEY from .env
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const BookOrder = require("../models/BookOrder");
const Review = require("../models/Review");

// =========================
// CREATE CHECKOUT SESSION
// =========================
router.post("/purchase", async (req, res) => {
  try {
    const { email, bookId } = req.body;
    console.log("[PURCHASE] Request received for book:", bookId, "email:", email);

    if (!email || !bookId) return res.status(400).json({ error: "Missing email or bookId" });

    const prices = {
      book1: 400,    // $4.00 USD
      book2: 420,    // $4.20 USD
    };

    if (!prices[bookId]) {
      console.log("[PURCHASE] Invalid bookId:", bookId);
      return res.status(400).json({ error: "Invalid bookId" });
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      console.error("[PURCHASE] Stripe secret key missing!");
      return res.status(500).json({ error: "Stripe secret key not set on server" });
    }

    console.log("[PURCHASE] Creating Stripe session...");
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
      success_url: `${process.env.FRONTEND_URL}/book-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/books`,
    });

    console.log("[PURCHASE] Stripe session created:", session.id);
    res.json({ sessionId: session.id });
  } catch (err) {
    console.error("[PURCHASE] Stripe session creation failed:", err.message, err);
    res.status(500).json({ error: "Purchase failed, check server logs" });
  }
});

// =========================
// VERIFY SESSION & RETURN DOWNLOAD
// =========================
router.get("/verify-session", async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ error: "Missing session_id" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log("[VERIFY] Retrieved session:", session.id, "status:", session.payment_status);

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
      console.log("[VERIFY] New order created with token:", downloadToken);
    } else {
      console.log("[VERIFY] Order already exists for", email, bookId);
    }

    res.json({
      downloadUrl: `${process.env.SERVER_URL}/api/books/download/${order.downloadToken}`,
      bookId,
      email,
    });
  } catch (err) {
    console.error("[VERIFY] Verification failed:", err.message, err);
    res.status(500).json({ error: "Verification failed, check server logs" });
  }
});

// =========================
// SECURE DOWNLOAD
// =========================
router.get("/download/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const order = await BookOrder.findOne({ downloadToken: token });

    if (!order) return res.status(403).json({ error: "Invalid link" });
    if (new Date() > order.expiryDate) return res.status(403).json({ error: "Link expired" });

    console.log("[DOWNLOAD] Serving book:", order.bookId, "for token:", token);
    res.redirect(`/pdfs/${order.bookId}.pdf`);
  } catch (err) {
    console.error("[DOWNLOAD] Failed:", err.message, err);
    res.status(500).json({ error: "Download failed" });
  }
});

// =========================
// ADD REVIEW
// =========================
router.post("/review", async (req, res) => {
  try {
    const { email, bookId, rating, comment } = req.body;
    const purchased = await BookOrder.findOne({ email, bookId });
    if (!purchased)
      return res.status(403).json({ error: "You must purchase this book before reviewing." });

    const review = await Review.create({ email, bookId, rating, comment });
    console.log("[REVIEW] New review:", review);
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
    const reviews = await Review.find({ bookId: req.params.bookId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("[GET REVIEWS] Failed:", err.message, err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;