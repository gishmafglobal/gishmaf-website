const express = require("express");
const router = express.Router();
const Review = require("../models/Review");

// Add review
router.post("/", async (req, res) => {
  try {
    const { bookId, rating, comment } = req.body;

    const review = new Review({ bookId, rating, comment });
    await review.save();

    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: "Failed to save review" });
  }
});

// Get reviews
router.get("/:bookId", async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;