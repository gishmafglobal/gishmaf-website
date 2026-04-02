const express = require("express");
const router = express.Router();
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const crypto = require("crypto");

const BookOrder = require("../models/BookOrder");
const Review = require("../models/Review");

// ================================
// CREATE CHECKOUT SESSION
// ================================
router.post("/purchase", async (req, res) => {
  try {
    const { email, bookId } = req.body;

    if (!email || !bookId) {
      return res.status(400).json({ error: "Missing email or bookId" });
    }

    const prices = { book1: 1000, book2: 1200 };
    if (!prices[bookId]) return res.status(400).json({ error: "Invalid book" });

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      metadata: { bookId },
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: { name: `Purchase of ${bookId}` },
            unit_amount: prices[bookId],
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.CLIENT_URL}/book-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.CLIENT_URL}/books`,
    });

    // **Return the Stripe hosted checkout URL**
    res.json({ url: session.url });
  } catch (err) {
    console.error("Purchase failed:", err);
    res.status(500).json({ error: "Purchase failed, checkout URL not created" });
  }
});

// ================================
// VERIFY SESSION & RETURN DOWNLOAD
// ================================
router.get("/verify-session", async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ error: "Missing session_id" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== "paid")
      return res.status(400).json({ error: "Payment not completed" });

    const { bookId } = session.metadata;
    const email = session.customer_email;

    // Create order if it doesn't exist
    let order = await BookOrder.findOne({ email, bookId });
    if (!order) {
      const token = crypto.randomBytes(20).toString("hex");
      order = await BookOrder.create({
        email,
        bookId,
        downloadToken: token,
        expiryDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // 24h validity
      });
    }

    res.json({
      downloadUrl: `${process.env.SERVER_URL}/api/books/download/${order.downloadToken}`,
      bookId,
      email,
    });
  } catch (err) {
    console.error("Verification failed:", err);
    res.status(500).json({ error: "Verification failed" });
  }
});

// ================================
// SECURE DOWNLOAD
// ================================
router.get("/download/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const order = await BookOrder.findOne({ downloadToken: token });
    if (!order) return res.status(403).json({ error: "Invalid link" });
    if (new Date() > order.expiryDate) return res.status(403).json({ error: "Link expired" });

    res.redirect(`/pdfs/${order.bookId}.pdf`);
  } catch (err) {
    console.error("Download failed:", err);
    res.status(500).json({ error: "Download failed" });
  }
});

module.exports = router;