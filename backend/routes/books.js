const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// Map your books and their PDFs & prices
const BOOKS = {
  book1: {
    title: "Escape from the Street",
    price: 500, // $5
    pdf: "EFTS BOOK.pdf",
  },
  book2: {
    title: "A Lonely Life Survivor",
    price: 700, // $7
    pdf: "Lonely Suvivor.pdf",
  },
};

// ===============================
// Test Route
// ===============================
router.get("/", (req, res) => {
  res.json({ message: "Books API working" });
});

// ===============================
// Create Stripe Checkout Session
// ===============================
router.post("/create-book-session", async (req, res) => {
  try {
    const { bookId, email } = req.body;

    if (!bookId || !email) return res.status(400).json({ error: "Missing bookId or email" });

    const book = BOOKS[bookId];
    if (!book) return res.status(400).json({ error: "Invalid bookId" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
      metadata: { bookId },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: book.title },
            unit_amount: book.price,
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/book-success?session_id={CHECKOUT_SESSION_ID}&bookId=${bookId}`,
      cancel_url: `${process.env.FRONTEND_URL}/books`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("🔥 Stripe Error:", err);
    res.status(500).json({ error: "Failed to create checkout session" });
  }
});

module.exports = router;