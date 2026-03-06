// const express = require("express");
// const router = express.Router();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const Purchase = require("../models/Purchase"); // MongoDB schema

// // Map of book IDs to Stripe price IDs
// const BOOK_PRICES = {
//   book1: process.env.STRIPE_PRICE_ID_BOOK1,
//   book2: process.env.STRIPE_PRICE_ID_BOOK2,
// };

// // Create Stripe checkout session for books
// router.post("/create-book-session", async (req, res) => {
//   try {
//     const { bookId } = req.body;
//     const priceId = BOOK_PRICES[bookId];

//     if (!priceId) return res.status(400).json({ error: "Invalid book ID" });

//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       payment_method_types: ["card"],
//       line_items: [
//         {
//           price: priceId,
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.FRONTEND_URL}/book-success?bookId=${bookId}`,
//       cancel_url: `${process.env.FRONTEND_URL}/books`,
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     console.error("Stripe book error:", error);
//     res.status(500).json({ error: "Failed to create book session" });
//   }
// });

// module.exports = router;

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
            unit_amount: 700, // $7
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