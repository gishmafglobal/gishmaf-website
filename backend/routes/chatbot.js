// routes/chatbot.js
const express = require("express");
const router = express.Router();
const { Configuration, OpenAIApi } = require("openai");

// Configure OpenAI SDK
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// POST /api/chat
router.post("/", async (req, res) => {
  const { messages } = req.body;

  // Validate request
  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages array is required and cannot be empty." });
  }

  // Check for API key
  if (!process.env.OPENAI_API_KEY) {
    console.error("❌ OpenAI API key not found.");
    return res.status(500).json({ error: "OpenAI API key is not configured on the server." });
  }

  try {
    // Call OpenAI Chat Completion
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    // Extract AI message safely
    const botMessage =
      completion?.data?.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate a response.";

    res.json({ message: botMessage });

  } catch (error) {
    // Detailed error logging for backend
    console.error("❌ Chatbot error:", error?.response?.data || error.message || error);

    // Return generic message to frontend
    res.status(500).json({
      error: "Something went wrong while communicating with the AI service. Please try again.",
    });
  }
});

module.exports = router;