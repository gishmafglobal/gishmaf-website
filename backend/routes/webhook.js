const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const nodemailer = require("nodemailer");
const path = require("path");
const crypto = require("crypto");
const BookOrder = require("../models/BookOrder");

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// ===============================
// EMAIL TRANSPORT
// ===============================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ===============================
// BOOK CONFIG
// ===============================
const BOOKS = {
  book1: {
    title: "Escape from the Street",
    pdf: "EFTS BOOK.pdf",
  },
  book2: {
    title: "A Lonely Life Survivor",
    pdf: "Lonely Suvivor.pdf",
  },
};

// ===============================
// STRIPE WEBHOOK
// ===============================
router.post("/", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      endpointSecret
    );
  } catch (err) {
    console.error("❌ Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      if (session.mode === "payment") {
        const email = session.customer_email;
        const bookId = session.metadata.bookId;
        const book = BOOKS[bookId];

        if (!book) return res.json({ received: true });

        // Generate secure token
        const downloadToken = crypto.randomBytes(32).toString("hex");

        // Expiry 30 days
        const expiryDate = new Date();
        expiryDate.setDate(expiryDate.getDate() + 30);

        // Save purchase in DB
        await BookOrder.create({
          email,
          bookId,
          paymentIntentId: session.payment_intent,
          downloadToken,
          expiryDate,
        });

        const filePath = path.join(
          __dirname,
          "../public/pdfs",
          book.pdf
        );

        // Send email WITH PDF + LINK
        await transporter.sendMail({
          from: `"Gishmaf" <${process.env.EMAIL_USER}>`,
          to: email,
          subject: "Your Book Purchase Was Successful 📘",
          html: `
            <h2>Thank you for purchasing "${book.title}"</h2>

            <p>Your book is attached to this email.</p>

            <p>You can also re-download using the link below:</p>

            <a href="${process.env.FRONTEND_URL}/download/${downloadToken}"
               style="padding:10px 20px;background:black;color:white;
               text-decoration:none;border-radius:6px;">
               Download Again
            </a>

            <p>Access expires on: ${expiryDate.toDateString()}</p>
          `,
          attachments: [
            {
              filename: book.pdf,
              path: filePath,
            },
          ],
        });

        console.log("✅ Email sent to:", email);
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error("🔥 Webhook error:", error);
    res.status(500).json({ error: "Webhook failed" });
  }
});

module.exports = router;