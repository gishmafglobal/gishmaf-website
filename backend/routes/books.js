const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const path = require("path");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const BookOrder = require("../models/BookOrder");

// ================= BOOK CONFIG =================
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

// ================= EMAIL =================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ================= CREATE CHECKOUT =================
router.post("/create-book-session", async (req, res) => {
  try {
    const { bookId, email } = req.body;
    const book = BOOKS[bookId];
    if (!book) return res.status(400).json({ error: "Invalid book" });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
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
      success_url: `${process.env.FRONTEND_URL}/book-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/books`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe error" });
  }
});

// ================= VERIFY PAYMENT =================
router.get("/verify-book-session", async (req, res) => {
  try {
    const { session_id } = req.query;
    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid")
      return res.json({ success: false });

    const bookId = session.metadata.bookId;
    const book = BOOKS[bookId];

    await BookOrder.findOneAndUpdate(
      { email: session.customer_email, bookId },
      {
        email: session.customer_email,
        bookId,
        paymentIntentId: session.payment_intent,
      },
      { upsert: true }
    );

    const token = jwt.sign(
      { email: session.customer_email, bookId },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    const downloadUrl = `${process.env.BACKEND_URL}/api/books/secure-download/${token}`;

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: session.customer_email,
      subject: "Your Book Purchase Receipt",
      html: `
        <h2>Thank you for purchasing ${book.title}</h2>
        <p>You can download your book below:</p>
        <a href="${downloadUrl}">Download Book</a>
        <p>This link expires in 24 hours.</p>
      `,
    });

    res.json({
      success: true,
      downloadUrl,
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Verification failed" });
  }
});

// ================= SECURE DOWNLOAD =================
router.get("/secure-download/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const book = BOOKS[decoded.bookId];

    const filePath = path.join(
      __dirname,
      "../public/pdfs",
      book.pdf
    );

    res.download(filePath);

  } catch {
    res.status(403).send("Download expired or invalid.");
  }
});

// ================= MY LIBRARY =================
router.get("/my-books", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.json({ success: false });

    const orders = await BookOrder.find({ email });

    const books = orders.map((order) => {
      const token = jwt.sign(
        { email: order.email, bookId: order.bookId },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      return {
        bookId: order.bookId,
        bookUrl: `${process.env.BACKEND_URL}/api/books/secure-download/${token}`,
      };
    });

    res.json({ success: true, books });

  } catch (err) {
    res.status(500).json({ success: false });
  }
});

module.exports = router;