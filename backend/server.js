
// console.log("🔥🔥🔥 BACKEND SERVER.JS IS RUNNING 🔥🔥🔥");

// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const booksRoute = require("./routes/books");
// const premiumRoute = require("./routes/premium");
// const commentsRoute = require("./routes/comments");

// const app = express();

// app.use(cors({ origin: "*" }));
// app.use(express.json());


// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI)
// .then(() => console.log("✅ MongoDB Connected"))
// .catch(err => console.log("Mongo Error:", err));


// // Test route
// app.get("/", (req, res) => {
//   res.send("Backend is running");
// });


// // Routes
// app.use("/api/books", booksRoute);
// app.use("/api/premium", premiumRoute);
// app.use("/api/comments", commentsRoute);


// // Port
// const PORT = process.env.PORT || 10000;


// app.listen(PORT, "0.0.0.0", () => {
//   console.log(`🚀 Server running on port ${PORT}`);
// });

console.log("🔥🔥🔥 BACKEND SERVER.JS IS RUNNING 🔥🔥🔥");

require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import routes
const booksRoute = require("./routes/books");
const premiumRoute = require("./routes/premium");
const commentsRoute = require("./routes/comments");
const webhookRoute = require("./routes/webhook");

const app = express();

// Stripe webhook must use raw body
app.use("/api/webhook", webhookRoute);

// Middleware
app.use(cors({ origin: "*" }));
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.log("Mongo Error:", err));

// Test route
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// API routes
app.use("/api/books", booksRoute);
app.use("/api/premium", premiumRoute);
app.use("/api/comments", commentsRoute);

// Start server
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});