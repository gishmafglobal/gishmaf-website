const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const BOOKS = {
  book1: {
    title: "Escape from the Street",
    price: 500,
    pdf: "EFTS BOOK.pdf",
  },
  book2: {
    title: "A Lonely Life Survivor",
    price: 700,
    pdf: "Lonely Suvivor.pdf",
  },
};

// Create Stripe Checkout Session
router.post("/create-book-session", async (req, res) => {
  try {
    const { bookId, email } = req.body;

    const book = BOOKS[bookId];
    if (!book) return res.status(400).json({ error: "Invalid book" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      customer_email: email, // Stripe sends receipt automatically

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

      success_url: `${process.env.CLIENT_URL}/book-success?session_id={CHECKOUT_SESSION_ID}&bookId=${bookId}`,
      cancel_url: `${process.env.CLIENT_URL}/books`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Stripe session failed" });
  }
});

// Verify payment
router.get("/verify-book-session", async (req, res) => {
  try {
    const { session_id, bookId } = req.query;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.json({ success: false });
    }

    const book = BOOKS[bookId];
    const bookUrl = `${process.env.SERVER_URL}/pdfs/${book.pdf}`;

    res.json({ success: true, bookUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;