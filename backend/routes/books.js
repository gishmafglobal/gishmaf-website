const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ===============================
// VERIFY ENVIRONMENT VARIABLES
// ===============================
if (!process.env.STRIPE_SECRET_KEY) {
  console.error("❌ Missing STRIPE_SECRET_KEY");
}

if (!process.env.FRONTEND_URL) {
  console.error("❌ Missing FRONTEND_URL");
}

// ===============================
// BOOK CONFIG
// ===============================
const BOOKS = {
  book1: {
    title: "Escape from the Street",
    price: 400, // $4.00 (Stripe uses cents)
    pdf: "EFTS BOOK.pdf",
  },
  book2: {
    title: "A Lonely Life Survivor",
    price: 420, // $4.20
    pdf: "Lonely Suvivor.pdf",
  },
};

// ===============================
// TEST ROUTE
// ===============================
router.get("/", (req, res) => {
  res.json({ message: "Books API working" });
});

// ===============================
// CREATE BOOK CHECKOUT SESSION
// ===============================
router.post("/create-book-session", async (req, res) => {
  try {
    const { bookId, email } = req.body;

    if (!bookId || !email) {
      return res.status(400).json({ error: "Missing bookId or email" });
    }

    const book = BOOKS[bookId];

    if (!book) {
      return res.status(400).json({ error: "Invalid bookId" });
    }

    if (!process.env.FRONTEND_URL) {
      return res.status(500).json({ error: "FRONTEND_URL not set" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,

      metadata: {
        bookId: bookId,
      },

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

      success_url: `${process.env.FRONTEND_URL}/book-success?session_id={CHECKOUT_SESSION_ID}&bookId=${bookId}`,
      cancel_url: `${process.env.FRONTEND_URL}/books`,
    });

    return res.json({ url: session.url });

  } catch (error) {
    console.error("🔥 FULL STRIPE ERROR:", error);
    return res.status(500).json({ error: error.message });
  }
});

module.exports = router;