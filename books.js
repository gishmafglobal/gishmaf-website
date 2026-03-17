const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const BookOrder = require("../models/BookOrder");
const nodemailer = require("nodemailer");

// Books data
const BOOKS = {
  book1: { title: "Escape from the Street", price: 500, pdf: "EFTS BOOK.pdf" },
  book2: { title: "A Lonely Life Survivor", price: 700, pdf: "Lonely Suvivor.pdf" },
};

// Nodemailer transporter (configure with your email and password)
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Stripe session for book purchase
router.post("/create-book-session", async (req, res) => {
  try {
    const { bookId, email } = req.body;
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
    console.error(error);
    res.status(500).json({ error: "Stripe session failed" });
  }
});

// Verify book purchase
router.get("/verify-book-session", async (req, res) => {
  try {
    const { session_id, bookId } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") return res.json({ success: false });

    const book = BOOKS[bookId];
    const bookUrl = `${process.env.SERVER_URL}/pdfs/${book.pdf}`;

    // Send confirmation email with PDF link
    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: session.customer_email,
      subject: `Your book: ${book.title}`,
      text: `Thank you for your purchase! You can download your book here: ${bookUrl}`,
      html: `<p>Thank you for your purchase!</p><p><a href="${bookUrl}">Download your book here</a></p>`,
    });

    res.json({ success: true, bookUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false });
  }
});

// Protected download
router.get("/download", async (req, res) => {
  try {
    const { email, bookId } = req.query;
    const order = await BookOrder.findOne({ email, bookId });
    if (!order) return res.status(403).json({ error: "Not purchased" });

    const book = BOOKS[bookId];
    const bookUrl = `${process.env.SERVER_URL}/pdfs/${book.pdf}`;
    res.json({ success: true, bookUrl });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Download failed" });
  }
});

module.exports = router;