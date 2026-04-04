const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { message } = req.body;

    const msg = message.toLowerCase();

    let reply = "I'm here to help 😊";

    if (msg.includes("course") || msg.includes("skill")) {
      reply =
        "We offer tech, business, and creative skills. Visit the Skills page to explore.";
    } else if (msg.includes("price")) {
      reply =
        "Our prices depend on the course. Contact us for full details.";
    } else if (msg.includes("help")) {
      reply = "You can reach support easily below.";
    }

    res.json({
      reply:
        reply +
        "\n\n👉 WhatsApp: https://wa.me/19378072552\n👉 Email: gishmafglobal@gmail.com",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;