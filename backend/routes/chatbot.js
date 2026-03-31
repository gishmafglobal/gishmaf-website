// routes/chatbot.js

const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

router.post("/", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: "Messages are required" });
    }

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const reply =
      completion?.choices?.[0]?.message?.content ||
      "Sorry, I couldn't generate a response.";

    res.status(200).json({ message: reply });

  } catch (error) {
    console.error("🔥 OpenAI FULL ERROR:", error);
    res.status(500).json({
      error: "AI server error. Please try again later."
    });
  }
});

module.exports = router;