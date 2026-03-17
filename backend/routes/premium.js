// const express = require("express");
// const router = express.Router();

// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// const PremiumUser = require("../models/PremiumUser");


// // CREATE STRIPE CHECKOUT SESSION
// router.post("/create-premium-session", async (req, res) => {
//   try {

//     const session = await stripe.checkout.sessions.create({

//       payment_method_types: ["card"],

//       mode: "subscription",

//       line_items: [
//         {
//           price: process.env.STRIPE_PRICE_ID,
//           quantity: 1
//         }
//       ],

//       success_url:
//         "https://gishmaf-website-2.onrender.com/premium-success",

//       cancel_url:
//         "https://gishmaf-website-2.onrender.com/premium"

//     });

//     res.json({ url: session.url });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Stripe error" });
//   }
// });



// // CHECK IF USER IS PREMIUM
// router.get("/check/:email", async (req, res) => {

//   try {

//     const user = await PremiumUser.findOne({
//       email: req.params.email,
//       status: "active"
//     });

//     if (user) {
//       return res.json({ premium: true });
//     }

//     res.json({ premium: false });

//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: "Server error" });
//   }

// });

// module.exports = router;

const express = require("express");
const router = express.Router();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const PremiumUser = require("../models/PremiumUser");

// ===============================
// CREATE STRIPE CHECKOUT SESSION
// ===============================
router.post("/create-premium-session", async (req, res) => {
  try {

    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    if (!process.env.STRIPE_PRICE_ID) {
      return res.status(500).json({ error: "Missing STRIPE_PRICE_ID" });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",

      customer_email: email,

      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],

      success_url:
        "https://gishmaf-website-2.onrender.com/premium-success",
      cancel_url:
        "https://gishmaf-website-2.onrender.com/premium",

    });

    res.json({ url: session.url });

  } catch (error) {
    console.error("🔥 STRIPE ERROR:", error.message);
    res.status(500).json({ error: error.message });
  }
});


// ===============================
// CHECK PREMIUM USER
// ===============================
router.get("/check/:email", async (req, res) => {
  try {
    const user = await PremiumUser.findOne({
      email: req.params.email,
      status: "active",
    });

    res.json({ premium: !!user });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;