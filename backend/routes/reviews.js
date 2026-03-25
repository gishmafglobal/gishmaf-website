const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// ADD REVIEW
router.post("/", async (req, res) => {
  try {
    const { email, bookId, rating, comment } = req.body;

    if (!email || !bookId || !rating)
      return res.status(400).json({ error: "Missing fields" });

    await Review.create({ email, bookId, rating, comment });

    res.json({ success: true });

  } catch (err) {
    res.status(500).json({ error: "Failed" });
  }
});

// GET REVIEWS FOR BOOK
router.get("/:bookId", async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId })
      .sort({ createdAt: -1 });

    res.json(reviews);

  } catch (err) {
    res.status(500).json({ error: "Failed" });
  }
});

module.exports = router;