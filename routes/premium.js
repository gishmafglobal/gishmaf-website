const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const PremiumUser = require("../models/PremiumUser");
const nodemailer = require("nodemailer");

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: process.env.SMTP_PORT,
  secure: process.env.SMTP_SECURE === "true",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
});

// Check premium status
router.get("/check/:email", async (req, res) => {
  try {
    const user = await PremiumUser.findOne({ email: req.params.email, status: "active" });

    if (!user) return res.json({ premium: false });

    if (user.expiresAt && user.expiresAt < new Date()) {
      user.status = "expired";
      await user.save();
      return res.json({ premium: false });
    }

    res.json({ premium: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Stripe webhook
router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("❌ Webhook signature verification failed:", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try {
      const session = event.data?.object;

      // PREMIUM SUBSCRIPTION
      if (event.type === "checkout.session.completed" && session.mode === "subscription") {
        const email = session.customer_email;
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        await PremiumUser.findOneAndUpdate(
          { email },
          { email, status: "active", stripeCustomerId: session.customer, stripeSubscriptionId: session.subscription, expiresAt },
          { upsert: true, new: true }
        );

        // Send email with access confirmation
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: email,
          subject: "Premium Subscription Activated",
          text: `Your premium subscription is active until ${expiresAt.toDateString()}. Enjoy all premium videos!`,
          html: `<p>Your premium subscription is active until <strong>${expiresAt.toDateString()}</strong>.</p><p>Enjoy all premium videos!</p>`,
        });

        console.log("✅ Premium activated:", email);
      }

      // BOOK PURCHASE
      if (event.type === "checkout.session.completed" && session.mode === "payment") {
        const email = session.customer_email;
        const bookId = session.metadata.bookId;

        await BookOrder.create({ email, bookId, paymentIntentId: session.payment_intent });

        // Send email with download link
        const bookUrl = `${process.env.SERVER_URL}/pdfs/${bookId}.pdf`; // adjust as needed
        await transporter.sendMail({
          from: process.env.SMTP_USER,
          to: email,
          subject: "Book Purchase Success",
          text: `Thank you for your purchase! Download here: ${bookUrl}`,
          html: `<p>Thank you for your purchase!</p><p><a href="${bookUrl}">Download your book here</a></p>`,
        });

        console.log("📘 Book purchased:", email, bookId);
      }

      // Subscription cancelled
      if (event.type === "customer.subscription.deleted") {
        await PremiumUser.findOneAndUpdate({ stripeSubscriptionId: session.id }, { status: "cancelled" });
      }

      res.json({ received: true });
    } catch (error) {
      console.error("🔥 WEBHOOK ERROR:", error);
      res.status(500).json({ error: "Webhook failed" });
    }
  }
);

module.exports = router;