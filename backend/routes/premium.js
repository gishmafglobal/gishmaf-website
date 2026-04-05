// const express = require("express");
// const router = express.Router();
// const Stripe = require("stripe");

// const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

// // CREATE PREMIUM SESSION
// router.post("/create-premium-session", async (req, res) => {
//   try {
//     const { email } = req.body;

//     if (!email) {
//       return res.status(400).json({ error: "Email required" });
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       mode: "subscription",
//       customer_email: email,
//       line_items: [
//         {
//           price: process.env.STRIPE_PRICE_ID_PREMIUM, // ✅ MUST be price_***
//           quantity: 1,
//         },
//       ],
//       success_url: `${process.env.FRONTEND_URL}/premium-success`,
//       cancel_url: `${process.env.FRONTEND_URL}/premium`,
//     });

//     res.json({ url: session.url }); // ✅ VERY IMPORTANT
//   } catch (err) {
//     console.error("Stripe error:", err.message);
//     res.status(500).json({ error: "Failed to create session" });
//   }
// });

// module.exports = router;


const PremiumUser = require("../models/PremiumUser");

// CHECK IF USER IS PREMIUM
router.get("/check/:email", async (req, res) => {
  try {
    const user = await PremiumUser.findOne({
      email: req.params.email,
      status: "active",
    });

    res.json({ premium: !!user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});