const express = require("express");
const router = express.Router();
const path = require("path");
const BookOrder = require("../models/BookOrder");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");

const BOOKS = {
  book1: { title: "Escape from the Street", pdf: "EFTS BOOK.pdf" },
  book2: { title: "A Lonely Life Survivor", pdf: "Lonely Suvivor.pdf" },
};

// Email transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
});

// ---------------- CREATE BOOK ORDER ----------------
router.post("/purchase", async (req, res) => {
  try {
    const { email, bookId } = req.body;
    const book = BOOKS[bookId];
    if (!book) return res.status(400).json({ error: "Invalid book" });

    // Save in DB
    const order = await BookOrder.create({ email, bookId });

    // Generate download token (24h expiry)
    const token = jwt.sign({ email, bookId }, process.env.JWT_SECRET, { expiresIn: "24h" });
    const downloadUrl = `${process.env.BACKEND_URL}/api/books/download/${token}`;

    // Send email
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Your Book: ${book.title}`,
      html: `
        <h3>Thank you for your purchase!</h3>
        <p>Download your book here:</p>
        <a href="${downloadUrl}">Download PDF</a>
        <p>Link expires in 24 hours.</p>
      `,
    });

    res.json({ success: true, downloadUrl });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process purchase" });
  }
});

// ---------------- DOWNLOAD BOOK ----------------
router.get("/download/:token", async (req, res) => {
  try {
    const decoded = jwt.verify(req.params.token, process.env.JWT_SECRET);
    const book = BOOKS[decoded.bookId];
    if (!book) return res.status(404).send("Book not found");

    const filePath = path.join(__dirname, "../public/pdfs", book.pdf);
    res.download(filePath);
  } catch {
    res.status(403).send("Download expired or invalid.");
  }
});

// ---------------- FETCH MY BOOKS ----------------
router.get("/my-books", async (req, res) => {
  try {
    const { email } = req.query;
    if (!email) return res.json({ success: false, books: [] });

    const orders = await BookOrder.find({ email });
    const books = orders.map((o) => ({
      bookId: o.bookId,
      bookUrl: `${process.env.BACKEND_URL}/api/books/download/${jwt.sign(
        { email, bookId: o.bookId },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      )}`,
    }));

    res.json({ success: true, books });
  } catch {
    res.status(500).json({ success: false, books: [] });
  }
});

module.exports = router;