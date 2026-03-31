// routes/chatbot.js
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// POST /api/chat
router.post("/", async (req, res) => {
  const { messages } = req.body;

  if (!messages) return res.status(400).json({ error: "Messages are required" });

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7,
        max_tokens: 300
      })
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    console.error("OpenAI Error:", err);
    res.status(500).json({ error: "Failed to communicate with OpenAI" });
  }
});

module.exports = router;