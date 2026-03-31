// // routes/chatbot.js
// const express = require("express");
// const router = express.Router();
// const OpenAI = require("openai");

// // Ensure OpenAI key exists before creating client
// if (!process.env.OPENAI_API_KEY) {
//   console.error("❌ OpenAI API key missing in .env");
// }

// const openai = new OpenAI({
//   apiKey: process.env.OPENAI_API_KEY,
// });

// // POST /api/chat
// router.post("/", async (req, res) => {
//   const { messages } = req.body;

//   // Validate request body
//   if (!messages || !Array.isArray(messages) || messages.length === 0) {
//     return res.status(400).json({ error: "Messages array is required and cannot be empty." });
//   }

//   // Extra safety: check API key before making request
//   if (!process.env.OPENAI_API_KEY) {
//     return res.status(500).json({
//       error: "OpenAI API key is not configured. Contact admin.",
//     });
//   }

//   try {
//     const completion = await openai.chat.completions.create({
//       model: "gpt-3.5-turbo",
//       messages,
//       temperature: 0.7,
//       max_tokens: 300,
//     });

//     const botMessage = completion?.choices?.[0]?.message?.content?.trim();

//     // Ensure we always send a message back
//     if (!botMessage) {
//       console.warn("⚠️ OpenAI returned empty response:", completion);
//       return res.json({
//         message: "Sorry, the AI couldn't generate a response. Please try again.",
//       });
//     }

//     res.json({ message: botMessage });

//   } catch (error) {
//     // Detailed logging for debugging
//     console.error("❌ Chatbot error:", error?.response?.data || error.message || error);

//     // Friendly frontend message
//     res.status(500).json({
//       message: "Sorry, something went wrong while contacting AI. Please try again later.",
//     });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const OpenAI = require("openai");

if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OpenAI API key missing in .env");
}

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

router.post("/", async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: "Messages array is required and cannot be empty." });
  }

  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages,
      temperature: 0.7,
      max_tokens: 300,
    });

    const botMessage = completion?.choices?.[0]?.message?.content?.trim();

    if (!botMessage) {
      console.warn("⚠️ OpenAI returned empty response:", completion);
      return res.json({
        message: "Sorry, the AI couldn't generate a response. Try again.",
      });
    }

    res.json({ message: botMessage });

  } catch (error) {
    console.error("❌ Chatbot error:", error?.response?.data || error.message || error);
    res.status(500).json({
      message: "Sorry, something went wrong while contacting AI. Try again later.",
    });
  }
});

module.exports = router;