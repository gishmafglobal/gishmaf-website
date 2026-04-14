// const express = require("express");
// const router = express.Router();
// const Comment = require("../models/Comment");

// // GET all comments
// router.get("/", async (req, res) => {
//   try {
//     const comments = await Comment.find().sort({ createdAt: -1 });
//     res.json(comments);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// // POST a comment
// router.post("/", async (req, res) => {
//   try {
//     const { name, email, message } = req.body;

//     if (!name || !email || !message) {
//       return res.status(400).json({ error: "All fields required" });
//     }

//     const newComment = new Comment({
//       name,
//       email,
//       message,
//     });

//     await newComment.save();

//     res.json({
//       message: "Comment saved successfully",
//       data: newComment, // 👈 important so frontend updates instantly
//     });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// module.exports = router;



const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");


// ============================
// ✅ GET ALL COMMENTS
// ============================
router.get("/", async (req, res) => {
  try {
    const comments = await Comment.find()
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    console.error("GET ERROR:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
});


// ============================
// ✅ POST NEW COMMENT
// ============================
router.post("/", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        error: "All fields (name, email, message) are required",
      });
    }

    const newComment = new Comment({
      name,
      email,
      message,
      likes: 0,
      replies: [],
    });

    await newComment.save();

    res.json({
      message: "✅ Comment saved successfully",
      data: newComment,
    });
  } catch (err) {
    console.error("POST ERROR:", err);
    res.status(500).json({ error: "Failed to save comment" });
  }
});


// ============================
// 👍 LIKE A COMMENT
// ============================
router.put("/:id/like", async (req, res) => {
  try {
    const updated = await Comment.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    );

    res.json({
      message: "👍 Liked",
      data: updated,
    });
  } catch (err) {
    console.error("LIKE ERROR:", err);
    res.status(500).json({ error: "Failed to like comment" });
  }
});


// ============================
// 💬 REPLY TO COMMENT
// ============================
router.post("/reply", async (req, res) => {
  try {
    const { parentId, message } = req.body;

    if (!parentId || !message) {
      return res.status(400).json({
        error: "Parent ID and message are required",
      });
    }

    const updated = await Comment.findByIdAndUpdate(
      parentId,
      {
        $push: {
          replies: {
            message,
            date: new Date(),
          },
        },
      },
      { new: true }
    );

    res.json({
      message: "💬 Reply added",
      data: updated,
    });
  } catch (err) {
    console.error("REPLY ERROR:", err);
    res.status(500).json({ error: "Failed to add reply" });
  }
});


module.exports = router;