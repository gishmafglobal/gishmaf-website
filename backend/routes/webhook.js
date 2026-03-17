// const express = require("express");
// const router = express.Router();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// router.post("/stripe", express.raw({ type: "application/json" }), (req, res) => {
//   const sig = req.headers["stripe-signature"];

//   let event;

//   try {
//     event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
//   } catch (err) {
//     console.log("❌ Webhook signature verification failed.", err.message);
//     return res.status(400).send(`Webhook Error: ${err.message}`);
//   }

//   // Handle event
//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object;

//     console.log("✅ Payment successful for:", session.customer_email);

//     // Here you can save subscription status to database
//   }

//   res.json({ received: true });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const PremiumUser = require("../models/PremiumUser");

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

// Use raw body for Stripe signature verification
router.post(
  "/stripe",
  express.raw({ type: "application/json" }),
  async (req, res) => {
    const sig = req.headers["stripe-signature"];
    let event;

    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error("❌ Webhook signature verification failed.", err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    // Handle checkout session completed
    if (event.type === "checkout.session.completed") {
      const session = event.data.object;

      console.log("✅ Payment successful for:", session.customer_email);

      try {
        // Save user as premium
        const email = session.customer_email;
        let user = await PremiumUser.findOne({ email });

        if (!user) {
          user = new PremiumUser({
            email,
            stripeCustomerId: session.customer,
            subscriptionId: session.subscription,
            status: "active",
          });
        } else {
          // Update existing user
          user.stripeCustomerId = session.customer;
          user.subscriptionId = session.subscription;
          user.status = "active";
        }

        await user.save();
        console.log(`💾 Premium user saved/updated: ${email}`);
      } catch (dbErr) {
        console.error("❌ Database error saving premium user:", dbErr);
      }
    }

    // Handle subscription cancelled (optional)
    if (event.type === "customer.subscription.deleted") {
      const subscription = event.data.object;
      const user = await PremiumUser.findOne({ subscriptionId: subscription.id });
      if (user) {
        user.status = "cancelled";
        await user.save();
        console.log(`⚠️ Subscription cancelled for: ${user.email}`);
      }
    }

    res.json({ received: true });
  }
);

module.exports = router;