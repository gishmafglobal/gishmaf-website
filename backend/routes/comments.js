const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// GET all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ createdAt: -1 });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST a comment
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields required" });
    }

    const newComment = new Comment({
      name,
      email,
      message,
    });

    await newComment.save();

    res.json({
      message: "Comment saved successfully",
      data: newComment, // 👈 important so frontend updates instantly
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;