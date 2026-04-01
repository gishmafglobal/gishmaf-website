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
const router = express.Router();
const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    let userMessage;

    // Accept both frontend formats
    if (req.body.message) {
      userMessage = req.body.message;
    } else if (req.body.messages && Array.isArray(req.body.messages)) {
      userMessage = req.body.messages[req.body.messages.length - 1].content;
    }

    if (!userMessage) {
      return res.status(400).json({ error: "No message provided" });
    }

    // Check API Key
    if (!process.env.OPENAI_API_KEY) {
      console.error("❌ OPENAI_API_KEY missing!");
      return res.status(500).json({ error: "Server misconfigured" });
    }

    // Call OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4.1-mini", // universally available model
      messages: [
        {
          role: "system",
          content: "You are a friendly professional assistant for Gishmaf Global Concept.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply = completion?.choices?.[0]?.message?.content || 
                  "Sorry, I couldn't generate a response.";

    res.json({ message: reply });
  } catch (error) {
    console.error("🔥 CHAT ERROR:", error);
    res.status(500).json({
      error: "AI service temporarily unavailable",
      details: error.message,
    });
  }
});

module.exports = router;