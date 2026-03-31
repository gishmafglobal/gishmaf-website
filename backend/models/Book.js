// // backend/routes/books.js
// const express = require("express");
// const router = express.Router();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const BookOrder = require("../models/BookOrder");

// const BOOKS = {
//   book1: {
//     title: "Escape from the Street",
//     price: 500, // in cents for USD
//     pdf: "EFTS BOOK.pdf",
//   },
//   book2: {
//     title: "A Lonely Life Survivor",
//     price: 700,
//     pdf: "Lonely Suvivor.pdf",
//   },
// };

// // Create Stripe Checkout Session
// router.post("/create-book-session", async (req, res) => {
//   try {
//     const { bookId, email } = req.body;
//     if (!bookId || !email) return res.status(400).json({ error: "Missing data" });

//     const book = BOOKS[bookId];
//     if (!book) return res.status(400).json({ error: "Invalid book" });

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "payment",
//       customer_email: email,
//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: { name: book.title },
//             unit_amount: book.price,
//           },
//           quantity: 1,
//         },
//       ],
//       metadata: { bookId },
//       success_url: `${process.env.CLIENT_URL}/book-success?session_id={CHECKOUT_SESSION_ID}&bookId=${bookId}`,
//       cancel_url: `${process.env.CLIENT_URL}/books`,
//     });

//     res.json({ url: session.url });
//   } catch (error) {
//     console.error("Stripe session error:", error);
//     res.status(500).json({ error: "Failed to create checkout session. Try again." });
//   }
// });

// // Verify payment and allow download
// router.get("/verify-book-session", async (req, res) => {
//   try {
//     const { session_id, bookId } = req.query;
//     if (!session_id || !bookId) return res.status(400).json({ success: false });

//     const session = await stripe.checkout.sessions.retrieve(session_id);

//     if (session.payment_status !== "paid") return res.json({ success: false });

//     const book = BOOKS[bookId];
//     const bookUrl = `${process.env.SERVER_URL}/pdfs/${book.pdf}`;

//     // Record purchase
//     await BookOrder.findOneAndUpdate(
//       { email: session.customer_email, bookId },
//       { email: session.customer_email, bookId, paymentIntentId: session.payment_intent },
//       { upsert: true }
//     );

//     res.json({ success: true, bookUrl });
//   } catch (error) {
//     console.error("Verify session error:", error);
//     res.status(500).json({ success: false });
//   }
// });

// module.exports = router;



// backend/routes/books.js
const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const BookOrder = require("../models/BookOrder");

// ===============================
// BOOK DATA WITH DEFAULT REVIEWS
// ===============================
const BOOKS = {
  book1: {
    id: "book1",
    title: "Escape from the Street",
    price: 500, // in cents
    pdf: "EFTS BOOK.pdf",
    reviews: [
      { user: "Alice", rating: 5, comment: "Absolutely gripping! Couldn't put it down." },
      { user: "Bob", rating: 5, comment: "Well-written and professional. Highly recommended." },
      { user: "Clara", rating: 5, comment: "A masterpiece! Very inspiring story." },
      { user: "David", rating: 5, comment: "Engaging from start to finish. Love it!" },
      { user: "Eva", rating: 5, comment: "Fantastic book. Worth every penny!" }
    ]
  },
  book2: {
    id: "book2",
    title: "A Lonely Life Survivor",
    price: 700,
    pdf: "Lonely Suvivor.pdf",
    reviews: [
      { user: "Frank", rating: 5, comment: "Heart-touching and motivational. Loved it!" },
      { user: "Grace", rating: 5, comment: "An amazing read. Very professional layout." },
      { user: "Hannah", rating: 5, comment: "Couldn't stop reading. Excellent!" },
      { user: "Ian", rating: 5, comment: "Truly inspiring. Highly recommend to everyone." },
      { user: "Jane", rating: 5, comment: "Beautifully written. Engaging story!" }
    ]
  }
};

// Compute averageRating for each book
for (const key in BOOKS) {
  const book = BOOKS[key];
  const total = book.reviews.reduce((sum, r) => sum + r.rating, 0);
  book.averageRating = (total / book.reviews.length).toFixed(1); // e.g., "5.0"
}

// ===============================
// GET ALL BOOKS (with reviews)
// ===============================
router.get("/", (req, res) => {
  const booksArray = Object.values(BOOKS);
  res.json(booksArray);
});

// ===============================
// CREATE STRIPE CHECKOUT SESSION
// ===============================
router.post("/create-book-session", async (req, res) => {
  try {
    const { bookId, email } = req.body;
    if (!bookId || !email) return res.status(400).json({ error: "Missing data" });

    const book = BOOKS[bookId];
    if (!book) return res.status(400).json({ error: "Invalid book" });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      customer_email: email,
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
      metadata: { bookId },
      success_url: `${process.env.CLIENT_URL}/book-success?session_id={CHECKOUT_SESSION_ID}&bookId=${bookId}`,
      cancel_url: `${process.env.CLIENT_URL}/books`,
    });

    res.json({ url: session.url });
  } catch (error) {
    console.error("Stripe session error:", error);
    res.status(500).json({ error: "Failed to create checkout session. Try again." });
  }
});

// ===============================
// VERIFY PAYMENT AND ALLOW DOWNLOAD
// ===============================
router.get("/verify-book-session", async (req, res) => {
  try {
    const { session_id, bookId } = req.query;
    if (!session_id || !bookId) return res.status(400).json({ success: false });

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") return res.json({ success: false });

    const book = BOOKS[bookId];
    const bookUrl = `${process.env.SERVER_URL}/pdfs/${book.pdf}`;

    // Record purchase
    await BookOrder.findOneAndUpdate(
      { email: session.customer_email, bookId },
      { email: session.customer_email, bookId, paymentIntentId: session.payment_intent },
      { upsert: true }
    );

    res.json({ success: true, bookUrl });
  } catch (error) {
    console.error("Verify session error:", error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;