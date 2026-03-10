
// // console.log("🔥🔥🔥 BACKEND SERVER.JS IS RUNNING 🔥🔥🔥");

// // require("dotenv").config();

// // const express = require("express");
// // const mongoose = require("mongoose");
// // const cors = require("cors");

// // const booksRoute = require("./routes/books");
// // const premiumRoute = require("./routes/premium");
// // const commentsRoute = require("./routes/comments");

// // const app = express();

// // app.use(cors({ origin: "*" }));
// // app.use(express.json());


// // // MongoDB connection
// // mongoose.connect(process.env.MONGO_URI)
// // .then(() => console.log("✅ MongoDB Connected"))
// // .catch(err => console.log("Mongo Error:", err));


// // // Test route
// // app.get("/", (req, res) => {
// //   res.send("Backend is running");
// // });


// // // Routes
// // app.use("/api/books", booksRoute);
// // app.use("/api/premium", premiumRoute);
// // app.use("/api/comments", commentsRoute);


// // // Port
// // const PORT = process.env.PORT || 10000;


// // app.listen(PORT, "0.0.0.0", () => {
// //   console.log(`🚀 Server running on port ${PORT}`);
// // });

// console.log("🔥🔥🔥 BACKEND SERVER.JS IS RUNNING 🔥🔥🔥");

// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// // Import routes
// const booksRoute = require("./routes/books");
// const premiumRoute = require("./routes/premium");
// const commentsRoute = require("./routes/comments");
// const webhookRoute = require("./routes/webhook");

// const app = express();

// // Stripe webhook must use raw body
// app.use("/api/webhook", webhookRoute);

// // Middleware
// app.use(cors({ origin: "*" }));
// app.use(express.json());

// // MongoDB
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => console.log("Mongo Error:", err));

// // Test route
// app.get("/", (req, res) => {
//   res.send("Backend is running");
// });

// // API routes
// app.use("/api/books", booksRoute);
// app.use("/api/premium", premiumRoute);
// app.use("/api/comments", commentsRoute);

// // Start server
// const PORT = process.env.PORT || 10000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

console.log("🔥 BACKEND SERVER.JS IS RUNNING 🔥");

require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();


// ===============================
// STRIPE WEBHOOK (MUST BE BEFORE JSON)
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
// SERVE STATIC FILES (PDFs)
// ===============================
app.use(express.static(path.join(__dirname, "public")));


// ===============================
// DATABASE CONNECTION
// ===============================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ Mongo Error:", err));


// ===============================
// ROUTES
// ===============================
app.use("/api/books", require("./routes/books"));
app.use("/api/premium", require("./routes/premium"));
app.use("/api/comments", require("./routes/comments"));


// ===============================
// TEST ROUTE
// ===============================
app.get("/", (req, res) => {
  res.send("🚀 Backend is running properly");
});


// ===============================
// START SERVER
// ===============================
const PORT = process.env.PORT || 10000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server running on port ${PORT}`);
});