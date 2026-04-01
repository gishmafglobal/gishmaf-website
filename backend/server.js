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
app.use(cors({ origin: "*" })); // Allow all origins
app.use(express.json()); // Parse JSON request bodies

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
const chatbotRoute = require("./routes/chatbot");
app.use("/api/chat", chatbotRoute);

// ===============================
// HEALTH CHECK
// ===============================
app.get("/", (req, res) => {
  res.send("🚀 Backend running");
});

// ===============================
// ERROR HANDLING FOR UNKNOWN ROUTES
// ===============================
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// ===============================
// GLOBAL ERROR HANDLER
// ===============================
app.use((err, req, res, next) => {
  console.error("Global Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// ===============================
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

