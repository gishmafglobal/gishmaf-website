require("dotenv").config();
const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

// Initialize OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // ✅ Make sure your key is in .env
});

// POST /api/chat
router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "No messages provided" });
    }

    // Create completion using chat model
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // lightweight & responsive
      messages: messages,
      temperature: 0.7,
      max_tokens: 250,
    });

    const botReply = completion.choices[0].message.content;

    res.json({ message: botReply });
  } catch (err) {
    console.error("Chatbot error:", err.message || err);
    res.status(500).json({ error: "Failed to get response from AI" });
  }
});

module.exports = router;