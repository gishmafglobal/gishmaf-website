// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const app = express();

// // ===============================
// // STRIPE WEBHOOK (MUST BE FIRST)
// // ===============================
// app.use(
//   "/api/webhook",
//   express.raw({ type: "application/json" }),
//   require("./routes/webhook")
// );

// // ===============================
// // NORMAL MIDDLEWARE
// // ===============================
// app.use(cors({ origin: "*" })); // Allow all origins
// app.use(express.json()); // Parse JSON request bodies

// // ===============================
// // STATIC FILES
// // ===============================
// app.use("/pdfs", express.static(path.join(__dirname, "public/pdfs")));
// app.use(express.static(path.join(__dirname, "public")));

// // ===============================
// // DATABASE
// // ===============================
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // ===============================
// // ROUTES
// // ===============================
// app.use("/api/books", require("./routes/books"));

// // ===============================
// // CHATBOT ROUTE
// // ===============================
// const chatbotRoute = require("./routes/chatbot");
// app.use("/api/chat", chatbotRoute);

// // ===============================
// // HEALTH CHECK
// // ===============================
// app.get("/", (req, res) => {
//   res.send("🚀 Backend running");
// });

// // ===============================
// // ERROR HANDLING FOR UNKNOWN ROUTES
// // ===============================
// app.use((req, res, next) => {
//   res.status(404).json({ error: "Route not found" });
// });

// // ===============================
// // GLOBAL ERROR HANDLER
// // ===============================
// app.use((err, req, res, next) => {
//   console.error("Global Error:", err);
//   res.status(500).json({ error: "Internal Server Error" });
// });

// // ===============================
// const PORT = process.env.PORT || 10000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });



require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ===============================
// STRIPE WEBHOOK (Optional)
// ===============================
// app.use("/api/webhook", express.raw({ type: "application/json" }), require("./routes/webhook"));

// ===============================
// NORMAL MIDDLEWARE
// ===============================
app.use(cors({ origin: "*" })); // Allow all origins
app.use(express.json()); // Parse JSON

// ===============================
// STATIC FILES
// ===============================
app.use("/pdfs", express.static(path.join(__dirname, "public/pdfs")));
app.use(express.static(path.join(__dirname, "public")));

// ===============================
// DATABASE (Optional, if using Mongo)
// ===============================
if (process.env.MONGO_URI) {
  mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("✅ MongoDB Connected"))
    .catch((err) => console.error("❌ MongoDB Error:", err));
}

// ===============================
// ROUTES
// ===============================
const Stripe = require("stripe");
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

app.post("/api/books/purchase", async (req, res) => {
  try {
    const { email, bookId } = req.body;
    console.log("📥 Purchase request payload:", req.body);

    if (!email || !bookId) return res.status(400).json({ error: "Missing email or bookId" });
    if (!process.env.FRONTEND_URL) return res.status(500).json({ error: "Missing FRONTEND_URL in env" });
    if (!process.env.STRIPE_SECRET_KEY) return res.status(500).json({ error: "Missing STRIPE_SECRET_KEY in env" });

    console.log("🔹 Creating Stripe checkout session...");
    const prices = { book1: 400, book2: 420 };

    if (!prices[bookId]) return res.status(400).json({ error: "Invalid bookId" });

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      metadata: { bookId },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: { name: `Book: ${bookId}` },
            unit_amount: prices[bookId],
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/book-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/books`,
    });

    console.log("✅ Stripe session created:", session.id);
    res.json({ sessionId: session.id });

  } catch (err) {
    console.error("🔥 Stripe /purchase error:", err);
    res.status(500).json({ error: err.message || "Stripe session creation failed" });
  }
});

// ===============================
// HEALTH CHECK
// ===============================
app.get("/", (req, res) => res.send("🚀 Backend running"));

// ===============================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));