// require("dotenv").config({ path: __dirname + "/.env" });

// console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
// console.log("BACKEND_URL:", process.env.BACKEND_URL);
// console.log("STRIPE:", process.env.STRIPE_SECRET_KEY ? "OK" : "MISSING");

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const app = express();

// // ======================================
// // STRIPE WEBHOOK (MUST COME FIRST)
// // ======================================
// app.use(
//   "/api/webhook",
//   express.raw({ type: "application/json" }),
//   require("./routes/webhook")
// );

// // ======================================
// // MIDDLEWARE
// // ======================================
// app.use(cors({ origin: "*" }));
// app.use(express.json());

// // ======================================
// // STATIC FILES (VERY IMPORTANT FIX)
// // ======================================

// // Serve PDFs correctly
// app.use(
//   "/pdfs",
//   express.static(path.join(__dirname, "public/pdfs"))
// );

// // Optional: serve other static files
// app.use(express.static(path.join(__dirname, "public")));

// // ======================================
// // DATABASE
// // ======================================
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));

// // ======================================
// // ROUTES
// // ======================================
// app.use("/api/books", require("./routes/books"));
// app.use("/api/premium", require("./routes/premium"));
// app.use("/api/comments", require("./routes/comments"));
// app.use("/api/reviews", require("./routes/reviews"));

// // ======================================
// // HEALTH CHECK
// // ======================================
// app.get("/", (req, res) => {
//   res.status(200).send("🚀 Backend is running properly");
// });

// // ======================================
// // START SERVER
// // ======================================
// const PORT = process.env.PORT || 10000;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });


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