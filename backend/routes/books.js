const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const path = require("path");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const BookOrder = require("../models/BookOrder");

// ------------------ Book Config ------------------
const BOOKS = {
  book1: { title: "Escape from the Street", price: 500, pdf: "EFTS BOOK.pdf" },
  book2: { title: "A Lonely Life Survivor", price: 700, pdf: "Lonely Suvivor.pdf" },
};

// ------------------ Email Transport ------------------
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// ------------------ CREATE STRIPE CHECKOUT SESSION ------------------
router.post("/create-book-session", async (req, res) => {
  const { bookId, email } = req.body;
  const book = BOOKS[bookId];
  if (!book) return res.status(400).json({ error: "Invalid book" });

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      metadata: { bookId },
      line_items: [
        { price_data: { currency: "usd", product_data: { name: book.title }, unit_amount: book.price }, quantity: 1 },
      ],
      success_url: `${process.env.FRONTEND_URL}/book-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/books`,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe session creation failed" });
  }
});

// ------------------ VERIFY PAYMENT + SAVE ORDER ------------------
router.get("/verify-book-session", async (req, res) => {
  const { session_id } = req.query;
  try {
    const session = await stripe.checkout.sessions.retrieve(session_id);
    if (session.payment_status !== "paid") return res.json({ success: false });

    const bookId = session.metadata.bookId;
    const book = BOOKS[bookId];

    await BookOrder.findOneAndUpdate(
      { email: session.customer_email, bookId },
      { email: session.customer_email, bookId, paymentIntentId: session.payment_intent },
      { upsert: true }
    );

    // Create download token
    const token = jwt.sign({ email: session.customer_email, bookId }, process.env.JWT_SECRET, { expiresIn: "24h" });
    const downloadUrl = `${process.env.BACKEND_URL}/api/books/secure-download/${token}`;

    // Send receipt email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: session.customer_email,
      subject: "Your Book Purchase Receipt",
      html: `<h2>Thank you for purchasing ${book.title}</h2>
             <p>You can download your book below:</p>
             <a href="${downloadUrl}">Download Book</a>
             <p>This link expires in 24 hours.</p>`,
    });

    res.json({ success: true, downloadUrl, bookId, email: session.customer_email });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Verification failed" });
  }
});

// ------------------ SECURE DOWNLOAD ------------------
router.get("/secure-download/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const book = BOOKS[decoded.bookId];
    const filePath = path.join(__dirname, "../public/pdfs", book.pdf);
    res.download(filePath);
  } catch {
    res.status(403).send("Download expired or invalid.");
  }
});

// ------------------ TEST DOWNLOAD (Bypass Stripe for testing) ------------------
router.get("/test-download/:bookId", async (req, res) => {
  const { bookId } = req.params;
  const book = BOOKS[bookId];
  if (!book) return res.status(404).send("Book not found");
  const filePath = path.join(__dirname, "../public/pdfs", book.pdf);
  res.download(filePath, book.pdf, (err) => err && console.error(err));
});

module.exports = router;