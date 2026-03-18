const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ===============================
// TEST ROUTE
// ===============================
router.get("/", (req, res) => {
  res.json({
    message: "Books API is working ✅"
  });
});

// ===============================
// BOOKS DATA
// ===============================
const BOOKS = {
  book1: {
    title: "Escape from the Street",
    price: 500, // in cents = $5
    pdf: "book1.pdf",
  },
  book2: {
    title: "A Lonely Life Survivor",
    price: 700, // $7
    pdf: "book2.pdf",
  },
};

// ===============================
// CREATE BOOK PAYMENT SESSION
// ===============================
router.post("/create-book-session", async (req, res) => {
  try {
    const { bookId, email } = req.body;

    if (!bookId || !email) {
      return res.status(400).json({ error: "Missing bookId or email" });
    }

    const book = BOOKS[bookId];
    if (!book) return res.status(400).json({ error: "Invalid bookId" });

    if (!process.env.STRIPE_SECRET_KEY) {
      return res.status(500).json({ error: "Stripe secret key not configured" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: book.title,
            },
            unit_amount: book.price,
          },
          quantity: 1,
        },
      ],
      metadata: { bookId },
      success_url: `${process.env.FRONTEND_URL}/book-success?session_id={CHECKOUT_SESSION_ID}&bookId=${bookId}`,
      cancel_url: `${process.env.FRONTEND_URL}/books`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("🔥 Stripe Error:", error);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

// ===============================
// VERIFY BOOK PAYMENT
// ===============================
router.get("/verify-book-session", async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ error: "Missing session_id" });

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      const bookId = session.metadata.bookId;
      const book = BOOKS[bookId];

      const bookUrl = book ? `${process.env.SERVER_URL}/pdfs/${book.pdf}` : null;

      return res.json({
        success: true,
        bookId,
        bookUrl,
      });
    } else {
      return res.json({ success: false });
    }
  } catch (error) {
    console.error("🔥 Verification Error:", error);
    res.status(500).json({ error: "Verification failed" });
  }
});

module.exports = router;