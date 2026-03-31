// require("dotenv").config();
// const express = require("express");
// const router = express.Router();
// const OpenAI = require("openai");

// // Initialize OpenAI client
// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY, // ✅ Make sure your key is in .env
// });

// // POST /api/chat
// router.post("/", async (req, res) => {
//   try {
//     const { messages } = req.body;

//     if (!messages || !Array.isArray(messages) || messages.length === 0) {
//       return res.status(400).json({ error: "No messages provided" });
//     }

//     // Create completion using chat model
//     const completion = await openai.chat.completions.create({
//       model: "gpt-4o-mini", // lightweight & responsive
//       messages: messages,
//       temperature: 0.7,
//       max_tokens: 250,
//     });

//     const botReply = completion.choices[0].message.content;

//     res.json({ message: botReply });
//   } catch (err) {
//     console.error("Chatbot error:", err.message || err);
//     res.status(500).json({ error: "Failed to get response from AI" });
//   }
// });

// module.exports = router;

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

    // Accept BOTH formats
    if (req.body.message) {
      userMessage = req.body.message;
    } else if (req.body.messages && Array.isArray(req.body.messages)) {
      userMessage = req.body.messages[req.body.messages.length - 1].content;
    }

    if (!userMessage) {
      return res.status(400).json({ error: "No message provided" });
    }

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content:
            "You are a professional and friendly assistant for Gishmaf Global Concept.",
        },
        {
          role: "user",
          content: userMessage,
        },
      ],
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply = completion.choices[0].message.content;

    return res.json({ message: reply });
  } catch (error) {
    console.error("🔥 CHAT ERROR:", error);
    return res.status(500).json({
      error: "AI service temporarily unavailable",
    });
  }
});

module.exports = router;