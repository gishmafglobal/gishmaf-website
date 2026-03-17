
// // console.log("🔥 BACKEND SERVER.JS IS RUNNING 🔥");

// // require("dotenv").config();

// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");
// // const path = require("path");

// // const app = express();


// // // ===============================
// // // STRIPE WEBHOOK (MUST BE BEFORE JSON)
// // // ===============================
// // app.use(
// //   "/api/webhook",
// //   express.raw({ type: "application/json" }),
// //   require("./routes/webhook")
// // );


// // // ===============================
// // // NORMAL MIDDLEWARE
// // // ===============================
// // app.use(cors({ origin: "*" }));
// // app.use(express.json());


// // // ===============================
// // // SERVE STATIC FILES (PDFs)
// // // ===============================
// // app.use(express.static(path.join(__dirname, "public")));


// // // ===============================
// // // DATABASE CONNECTION
// // // ===============================
// // mongoose.connect(process.env.MONGO_URI)
// //   .then(() => console.log("✅ MongoDB Connected"))
// //   .catch((err) => console.log("❌ Mongo Error:", err));


// // // ===============================
// // // ROUTES
// // // ===============================
// // app.use("/api/books", require("./routes/books"));
// // app.use("/api/premium", require("./routes/premium"));
// // app.use("/api/comments", require("./routes/comments"));


// // // ===============================
// // // TEST ROUTE
// // // ===============================
// // app.get("/", (req, res) => {
// //   res.send("🚀 Backend is running properly");
// // });


// // // ===============================
// // // START SERVER
// // // ===============================
// // const PORT = process.env.PORT || 10000;

// // app.listen(PORT, "0.0.0.0", () => {
// //   console.log(`🚀 Server running on port ${PORT}`);
// // });

// console.log("🔥 BACKEND SERVER.JS IS RUNNING 🔥");

// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");
// const path = require("path");

// const app = express();


// // ======================================================
// // 1️⃣ STRIPE WEBHOOK (MUST COME BEFORE express.json())
// // ======================================================
// app.use(
//   "/api/webhook",
//   express.raw({ type: "application/json" }),
//   require("./routes/webhook")
// );


// // ======================================================
// // 2️⃣ NORMAL MIDDLEWARE
// // ======================================================
// app.use(cors({ origin: "*" }));
// app.use(express.json());


// // ======================================================
// // 3️⃣ SERVE STATIC FILES (PDFs FOLDER)
// // public/pdfs/yourbook.pdf
// // ======================================================
// app.use(express.static(path.join(__dirname, "public")));


// // ======================================================
// // 4️⃣ DATABASE CONNECTION
// // ======================================================
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => console.log("✅ MongoDB Connected"))
//   .catch((err) => console.error("❌ MongoDB Error:", err));


// // ======================================================
// // 5️⃣ API ROUTES
// // ======================================================
// app.use("/api/books", require("./routes/books"));
// app.use("/api/premium", require("./routes/premium"));
// app.use("/api/comments", require("./routes/comments"));
// app.use("/api/reviews", require("./routes/reviews")); // ✅ Added reviews route


// // ======================================================
// // 6️⃣ HEALTH CHECK ROUTE
// // ======================================================
// app.get("/", (req, res) => {
//   res.status(200).send("🚀 Backend is running properly");
// });


// // ======================================================
// // 7️⃣ START SERVER
// // ======================================================
// const PORT = process.env.PORT || 10000;

// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

console.log("🔥 BACKEND SERVER IS RUNNING 🔥");

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

// ======================================
// STRIPE WEBHOOK (BEFORE express.json())
// ======================================
app.use(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  require("./routes/webhook")
);

// ======================================
// MIDDLEWARE
// ======================================
app.use(cors({ origin: "*" }));
app.use(express.json());

// ======================================
// STATIC FILES
// ======================================
app.use(express.static(path.join(__dirname, "public")));

// ======================================
// DATABASE
// ======================================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ======================================
// ROUTES
// ======================================
app.use("/api/books", require("./routes/books"));
app.use("/api/premium", require("./routes/premium"));
app.use("/api/comments", require("./routes/comments"));
app.use("/api/reviews", require("./routes/reviews"));

// ======================================
// HEALTH CHECK
// ======================================
app.get("/", (req, res) => {
  res.status(200).send("🚀 Backend is running properly");
});

// ======================================
// START SERVER
// ======================================
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});