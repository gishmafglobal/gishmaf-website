// const mongoose = require("mongoose");

// const BookSchema = new mongoose.Schema({
//   title: String,
//   author: String,
//   cover: String,
//   readLink: String,
// });

// module.exports = mongoose.model("Book", BookSchema);


const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// TEST ROUTE
router.get("/", (req, res) => {
  res.json({
    message: "Books API is working"
  });
});


// CREATE BOOK PAYMENT SESSION
router.post("/create-book-session", async (req, res) => {
  try {
    const { bookId } = req.body;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Premium Book",
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
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Stripe session failed" });
  }
});


// VERIFY BOOK PAYMENT
router.get("/verify-book-session", async (req, res) => {
  try {
    const { session_id } = req.query;

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status === "paid") {
      return res.json({
        success: true,
        bookUrl: "https://gishmaf-website-2.onrender.com/ebooks/book1.pdf" // PUT YOUR REAL BOOK LINK HERE
      });
    } else {
      return res.json({ success: false });
    }

  } catch (error) {
    console.error("Verification Error:", error);
    res.status(500).json({ error: "Verification failed" });
  }
});

module.exports = router;