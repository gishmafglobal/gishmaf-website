// const express = require("express");
// const router = express.Router();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const PremiumUser = require("../models/PremiumUser");
// const BookOrder = require("../models/BookOrder");

// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// router.post("/stripe", express.raw({ type: "application/json" }), async (req, res) => {
//   const sig = req.headers["stripe-signature"];
//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     console.error("❌ Webhook signature failed:", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   try {
//     if (event.type === "checkout.session.completed") {
//       const session = event.data.object;

//       if (session.mode === "subscription") {
//         const email = session.customer_email;
//         const expiresAt = new Date();
//         expiresAt.setDate(expiresAt.getDate() + 30);

//         await PremiumUser.findOneAndUpdate(
//           { email },
//           { email, status: "active", stripeCustomerId: session.customer, stripeSubscriptionId: session.subscription, expiresAt },
//           { upsert: true, new: true }
//         );

//         console.log("✅ Premium activated:", email);
//       }

//       if (session.mode === "payment") {
//         const email = session.customer_email;
//         const bookId = session.metadata.bookId;

//         await BookOrder.create({ email, bookId, paymentIntentId: session.payment_intent });
//         console.log("📘 Book purchased:", email, bookId);
//       }
//     }

//     if (event.type === "customer.subscription.deleted") {
//       const subscription = event.data.object;
//       await PremiumUser.findOneAndUpdate({ stripeSubscriptionId: subscription.id }, { status: "cancelled" });
//     }

//     res.json({ received: true });
//   } catch (error) {
//     console.error("🔥 Webhook error:", error);
//     res.status(500).json({ error: "Webhook failed" });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const PremiumUser = require("../models/PremiumUser");
const BookOrder = require("../models/BookOrder");
const nodemailer = require("nodemailer");

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// ===============================
// EMAIL SETUP
// ===============================
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ===============================
// SEND EMAIL FUNCTION
// ===============================
const sendEmail = async (to, subject, text) => {
  await transporter.sendMail({
    from: `"Gishmaf" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    text,
  });
};

router.post("/stripe", async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
  } catch (err) {
    console.error("❌ Webhook signature failed:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  try {
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      // ===============================
      // PREMIUM
      // ===============================
      if (session.mode === "subscription") {
        const email = session.customer_email;

        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 30);

        await PremiumUser.findOneAndUpdate(
          { email },
          {
            email,
            status: "active",
            stripeCustomerId: session.customer,
            stripeSubscriptionId: session.subscription,
            expiresAt,
          },
          { upsert: true, new: true }
        );

        await sendEmail(
          email,
          "Premium Activated 🎉",
          "Your premium subscription is now active."
        );

        console.log("✅ Premium activated:", email);
      }

      // ===============================
      // BOOK PURCHASE
      // ===============================
      if (session.mode === "payment") {
        const email = session.customer_email;
        const bookId = session.metadata.bookId;

        await BookOrder.create({
          email,
          bookId,
          paymentIntentId: session.payment_intent,
        });

        const downloadLink = `${process.env.FRONTEND_URL}/book-success?session_id=${session.id}`;

        // 📧 USER EMAIL
        await sendEmail(
          email,
          "Your Book is Ready 📘",
          `Thank you for your purchase!\n\nDownload your book here:\n${downloadLink}`
        );

        // 📧 ADMIN EMAIL
        await sendEmail(
          process.env.EMAIL_USER,
          "New Book Purchase 💰",
          `User ${email} purchased ${bookId}`
        );

        console.log("📘 Book purchased:", email, bookId);
      }
    }

    res.json({ received: true });
  } catch (error) {
    console.error("🔥 Webhook error:", error);
    res.status(500).json({ error: "Webhook failed" });
  }
});

module.exports = router;