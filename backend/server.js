// require("dotenv").config();

// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// app.use(cors());
// app.use(express.json());

// console.log("MONGO URI:", process.env.MONGO_URI);
// mongoose.connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("✅ MongoDB Connected Successfully");
//   })
//   .catch((err) => {
//     console.log("MongoDB Connection Error:", err.message);
//   });

// app.get("/", (req, res) => {
//   res.send("Gishmaf backend is running...");
// });

// const booksRoute = require("./routes/books");
// app.use("/api/books", booksRoute);


// const PORT = process.env.PORT || 5000;

// app.listen(PORT, () => {
//   console.log(`🚀 Server running on http://localhost:${PORT}`);
// });

console.log("🔥🔥🔥 BACKEND SERVER.JS IS RUNNING 🔥🔥🔥");
require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const booksRoute = require("./routes/books");

const app = express();

app.use(cors({ origin: "*" }));
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("Mongo Error:", err));

// TEST ROUTE
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// THIS IS THE IMPORTANT LINE
app.use("/api/books", booksRoute);

const commentsRoute = require("./routes/comments");
app.use("/api/comments", commentsRoute);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
