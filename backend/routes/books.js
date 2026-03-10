const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


// ===============================
// TEST ROUTE
// ===============================
router.get("/", (req, res) => {
  res.json({ message: "Books API is working" });
});


// ===============================
// CREATE STRIPE SESSION
// ===============================
router.post("/create-book-session", async (req, res) => {
  try {
    const { bookId } = req.body;

    let bookName = "";
    let price = 500; // $5

    if (bookId === "book1") {
      bookName = "Escape from the Street";
    } else if (bookId === "book2") {
      bookName = "A Lonely Life Survivor";
    } else {
      return res.status(400).json({ error: "Invalid book ID" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: bookName,
            },
            unit_amount: price,
          },
          quantity: 1,
        },
      ],

      metadata: {
        bookId: bookId,
      },

      success_url:
        "https://gishmaf-website-2.onrender.com/book-success?session_id={CHECKOUT_SESSION_ID}",

      cancel_url:
        "https://gishmaf-website-2.onrender.com/books",
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Stripe session failed" });
  }
});


// ===============================
// VERIFY PAYMENT & RETURN PDF
// ===============================
router.get("/verify-book-session", async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ error: "No session ID provided" });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.json({ success: false });
    }

    const bookId = session.metadata.bookId;

    let bookUrl = "";

    if (bookId === "book1") {
      bookUrl =
        "https://gishmaf-website-1.onrender.com/pdfs/EFTS%20BOOK.pdf";
    } else if (bookId === "book2") {
      bookUrl =
        "https://gishmaf-website-1.onrender.com/pdfs/Lonely%20Suvivor.pdf";
    }

    res.json({
      success: true,
      bookUrl: bookUrl,
    });

  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ error: "Verification failed" });
  }
});

module.exports = router;