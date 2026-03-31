
require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ===============================
// STRIPE WEBHOOK (MUST BE FIRST)
// ===============================
app.use(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  require("./routes/webhook")
);

// ===============================
// NORMAL MIDDLEWARE
// ===============================
app.use(cors({ origin: "*" }));
app.use(express.json());


// ===============================
// STATIC FILES
// ===============================
app.use("/pdfs", express.static(path.join(__dirname, "public/pdfs")));
app.use(express.static(path.join(__dirname, "public")));

// ===============================
// DATABASE
// ===============================
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ===============================
// ROUTES
// ===============================
app.use("/api/books", require("./routes/books"));

// ===============================
// CHATBOT ROUTE
// ===============================
app.use("/api/chat", require("./routes/chatbot"));

// ===============================
// HEALTH CHECK
// ===============================
app.get("/", (req, res) => {
  res.send("🚀 Backend running");
});

// ===============================
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});