// const express = require("express");
// const router = express.Router();
// const Comment = require("../models/Comment");

// // GET all comments
// router.get("/", async (req, res) => {
//   const comments = await Comment.find().sort({ date: -1 });
//   res.json(comments);
// });

// // POST a comment
// router.post("/", async (req, res) => {
//   const { name, email, message } = req.body;

//   const newComment = new Comment({ name, email, message });
//   await newComment.save();

//   res.json({ message: "Comment saved successfully" });
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

// GET all comments
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find().sort({ date: -1 });
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

    const newComment = new Comment({ name, email, message });
    await newComment.save();

    res.json({ message: "Comment saved successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
