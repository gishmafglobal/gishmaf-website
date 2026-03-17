
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ===============================
// TEST ROUTE
// ===============================
router.get("/", (req, res) => {
  res.json({
    message: "Books API is working"
  });
});


// ===============================
// CREATE BOOK PAYMENT SESSION
// ===============================
router.post("/create-book-session", async (req, res) => {
  try {
    const { bookId, email } = req.body;

    // 🔴 Validate input
    if (!bookId || !email) {
      return res.status(400).json({ error: "Missing bookId or email" });
    }

    // 🔴 Check env
    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: "Missing Stripe secret key" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      customer_email: email,

      // 🔥 IMPORTANT: store bookId inside Stripe
      metadata: {
        bookId: bookId
      },

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Premium Book (${bookId})`,
            },
            unit_amount: 500, // $5
          },
          quantity: 1,
        },
      ],

      success_url:
        "https://gishmaf-website-2.onrender.com/book-success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url:
        "https://gishmaf-website-2.onrender.com/books",
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error("🔥 Stripe Error:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// ===============================
// VERIFY BOOK PAYMENT (SECURE)
// ===============================
router.get("/verify-book-session", async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: "Missing session_id" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {

      // 🔥 Get bookId from Stripe metadata
      const bookId = session.metadata.bookId;

      // 🔥 Map books (IMPORTANT)
      const books = {
        "book1": "https://gishmaf-website-2.onrender.com/ebooks/book1.pdf",
        "book2": "https://gishmaf-website-2.onrender.com/ebooks/book2.pdf"
      };

      return res.json({
        success: true,
        bookId,
        bookUrl: books[bookId] || null
      });

    } else {
      return res.json({ success: false });
    }

  } catch (error) {
    console.error("🔥 Verification Error:", error.message);
    res.status(500).json({ error: "Verification failed" });
  }
});

module.exports = router;