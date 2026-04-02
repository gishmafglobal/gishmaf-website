const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const BookOrder = require("../models/BookOrder");
const Review = require("../models/Review");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// ===============================
// CREATE CHECKOUT SESSION
// ===============================
router.post("/purchase", async (req, res) => {
  try {
    const { email, bookId } = req.body;

    console.log("📥 /purchase request:", { email, bookId });

    if (!email || !bookId) {
      console.error("❌ Missing email or bookId");
      return res.status(400).json({ error: "Missing email or bookId" });
    }

    const prices = {
      book1: 400,
      book2: 420,
    };

    if (!prices[bookId]) {
      console.error("❌ Invalid bookId:", bookId);
      return res.status(400).json({ error: "Invalid bookId" });
    }

    console.log("🔹 FRONTEND_URL:", process.env.FRONTEND_URL);
    console.log("🔹 STRIPE_SECRET_KEY exists:", !!process.env.STRIPE_SECRET_KEY);

    console.log("🚀 Creating Stripe session...");

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

    console.log("✅ Stripe session created:", session.id);
    console.log("🌍 Stripe checkout URL:", session.url);

    return res.status(200).json({
      url: session.url, // ✅ REQUIRED FIX
    });

  } catch (err) {
    console.error("🔥 STRIPE ERROR FULL:", err);
    return res.status(500).json({
      error: err.message || "Stripe checkout failed",
    });
  }
});


// ===============================
// VERIFY SESSION
// ===============================
router.get("/verify-session", async (req, res) => {
  try {
    const { session_id } = req.query;

    console.log("📥 /verify-session:", session_id);

    if (!session_id) {
      console.error("❌ Missing session_id");
      return res.status(400).json({ error: "Missing session_id" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    console.log("🔎 Session status:", session.payment_status);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    const { bookId } = session.metadata;
    const email = session.customer_email;

    let order = await BookOrder.findOne({ email, bookId });

    if (!order) {
      const downloadToken = Math.random().toString(36).substring(2);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);

      order = await BookOrder.create({
        email,
        bookId,
        downloadToken,
        expiryDate,
      });

      console.log("✅ New order created:", order);
    } else {
      console.log("ℹ️ Order already exists");
    }

    return res.json({
      downloadUrl: `${process.env.SERVER_URL}/api/books/download/${order.downloadToken}`,
      bookId,
      email,
    });

  } catch (err) {
    console.error("🔥 VERIFY ERROR:", err);
    res.status(500).json({ error: "Verification failed" });
  }
});


// ===============================
// DOWNLOAD BOOK
// ===============================
router.get("/download/:token", async (req, res) => {
  try {
    const { token } = req.params;

    console.log("📥 Download request:", token);

    const order = await BookOrder.findOne({ downloadToken: token });

    if (!order) {
      console.error("❌ Invalid token");
      return res.status(403).json({ error: "Invalid link" });
    }

    if (new Date() > order.expiryDate) {
      console.error("❌ Link expired");
      return res.status(403).json({ error: "Link expired" });
    }

    console.log("✅ Serving book:", order.bookId);

    return res.redirect(`/pdfs/${order.bookId}.pdf`);

  } catch (err) {
    console.error("🔥 DOWNLOAD ERROR:", err);
    res.status(500).json({ error: "Download failed" });
  }
});


// ===============================
// ADD REVIEW
// ===============================
router.post("/review", async (req, res) => {
  try {
    const { email, bookId, rating, comment } = req.body;

    console.log("📥 New review:", { email, bookId });

    const purchased = await BookOrder.findOne({ email, bookId });

    if (!purchased) {
      return res.status(403).json({
        error: "You must purchase this book before reviewing.",
      });
    }

    const review = await Review.create({
      email,
      bookId,
      rating,
      comment,
    });

    console.log("✅ Review saved:", review);

    res.json(review);

  } catch (err) {
    console.error("🔥 REVIEW ERROR:", err);
    res.status(500).json({ error: "Review failed" });
  }
});


// ===============================
// GET REVIEWS
// ===============================
router.get("/reviews/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;

    console.log("📥 Fetch reviews for:", bookId);

    const reviews = await Review.find({ bookId }).sort({ createdAt: -1 });

    return res.json(reviews);

  } catch (err) {
    console.error("🔥 GET REVIEWS ERROR:", err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;