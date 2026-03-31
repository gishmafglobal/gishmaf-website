// routes/chatbot.js
const express = require("express");
const router = express.Router();
const fetch = require("node-fetch");

// POST /api/chat
router.post("/", async (req, res) => {
  const { messages } = req.body;

  // Validate request
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages array is required and cannot be empty." });
  }

  // Check if API key is present
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OpenAI API key not found in environment variables.");
    return res.status(500).json({ error: "OpenAI API key not configured on server." });
  }

  try {
    // Call OpenAI Chat Completions API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages,
        temperature: 0.7,
        max_tokens: 300,
      }),
    });

    // Parse OpenAI response
    const data = await response.json();

    // Check for OpenAI errors
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error("❌ Unexpected response from OpenAI:", data);
      return res.status(500).json({ error: "Unexpected response from OpenAI API." });
    }

    // Return AI message to frontend
    res.json({ message: data.choices[0].message.content });

  } catch (err) {
    console.error("❌ OpenAI request failed:", err);
    res.status(500).json({ error: "Failed to communicate with OpenAI API." });
  }
});

module.exports = router;