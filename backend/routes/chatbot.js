// routes/chatbot.js

const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

// Make sure API key exists
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY is missing in environment variables.");
}

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/chat
router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "Messages array is required."
      });
    }

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini", // modern working model
      messages: messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply =
      response.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    res.json({ message: reply });

  } catch (error) {
    console.error("🔥 OpenAI Error:", error);

    res.status(500).json({
      error: "AI server error. Please try again later."
    });
  }
});

module.exports = router;