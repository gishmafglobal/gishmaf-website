
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

const PremiumUser = require("../models/PremiumUser");

// ⚠️ MUST use raw body (already handled in server.js)

router.post("/", async (req, res) => {
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("❌ Webhook signature error:", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // =========================================
  // HANDLE EVENTS
  // =========================================

  try {
    switch (event.type) {
      // ✅ PAYMENT SUCCESS
      case "checkout.session.completed": {
        const session = event.data.object;

        const email = session.customer_email;

        if (!email) break;

        console.log("✅ Payment success for:", email);

        // SAVE OR UPDATE USER
        await PremiumUser.findOneAndUpdate(
          { email },
          {
            email,
            status: "active",
            stripeCustomerId: session.customer,
            expiresAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days
          },
          { upsert: true }
        );

        break;
      }

      // ❌ SUBSCRIPTION CANCELLED
      case "customer.subscription.deleted": {
        const subscription = event.data.object;

        console.log("❌ Subscription cancelled");

        await PremiumUser.findOneAndUpdate(
          { stripeSubscriptionId: subscription.id },
          { status: "cancelled" }
        );

        break;
      }

      default:
        console.log(`Unhandled event: ${event.type}`);
    }

    res.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook processing error:", err);
    res.status(500).json({ error: "Webhook handler failed" });
  }
});

module.exports = router;