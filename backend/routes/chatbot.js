// routes/chatbot.js
const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

// Configure OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// POST /api/chat
router.post("/", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages array is required and cannot be empty." });
  }

  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OpenAI API key not found.");
    return res.status(500).json({ error: "OpenAI API key is not configured on the server." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const botMessage =
      completion?.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate a response.";

    res.json({ message: botMessage });

  } catch (error) {
    console.error("❌ Chatbot error:", error?.response?.data || error.message || error);
    res.status(500).json({ error: "Something went wrong communicating with AI." });
  }
});

module.exports = router;