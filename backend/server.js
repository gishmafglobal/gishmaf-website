
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// =======================================
// STRIPE WEBHOOK (MUST COME FIRST)
// =======================================
app.use(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  require("./routes/webhook")
);

// =======================================
// CORS
// =======================================
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);

// =======================================
// BODY PARSER
// =======================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// =======================================
// STATIC FILES
// =======================================
app.use("/pdfs", express.static(path.join(__dirname, "public/pdfs")));
app.use(express.static(path.join(__dirname, "public")));

// =======================================
// DATABASE
// =======================================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Error:", err);
    process.exit(1);
  });

// =======================================
// ROUTES
// =======================================
app.use("/api/books", require("./routes/books"));

// ✅ PREMIUM ROUTES (ADD THIS)
const premiumRoutes = require("./routes/premium");
app.use("/api/premium", premiumRoutes);

// ✅ COMMENTS
const commentRoutes = require("./routes/comments");
app.use("/api/comments", commentRoutes);

// ✅ CHAT (ONLY ONE — FIXED)
const chatRoutes = require("./routes/chat");
app.use("/api/chat", chatRoutes);

// =======================================
// HEALTH CHECK
// =======================================
app.get("/", (req, res) => {
  res.send("🚀 Backend running");
});

// =======================================
// 404 HANDLER
// =======================================
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// =======================================
// GLOBAL ERROR HANDLER
// =======================================
app.use((err, req, res, next) => {
  console.error("🔥 Global Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// =======================================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});