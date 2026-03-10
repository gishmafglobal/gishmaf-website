
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

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: "Premium Book"
            },
            unit_amount: 500, // $5
          },
          quantity: 1,
        },
      ],

      success_url: "https://gishmaf-website-2.onrender.com/book-success",
      cancel_url: "https://gishmaf-website-2.onrender.com/books",
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error("Stripe Error:", error);
    res.status(500).json({ error: "Stripe session failed" });
  }
});

module.exports = router;