const express = require("express");
const router = express.Router();
const BookReview = require("../models/BookReview"); // Matches the model above

// Pre-populated fake reviews (for trust)
const FAKE_REVIEWS = {
  book1: [
    { email: "alice@example.com", rating: 5, comment: "Absolutely loved this book! A must-read." },
    { email: "john@example.com", rating: 5, comment: "Incredible story, really inspiring!" },
    { email: "emma@example.com", rating: 5, comment: "Couldn't put it down. Highly recommended." },
  ],
  book2: [
    { email: "mike@example.com", rating: 5, comment: "This book changed my perspective completely." },
    { email: "sarah@example.com", rating: 5, comment: "Amazing writing, very touching story." },
    { email: "lucas@example.com", rating: 5, comment: "Five stars! I feel connected to the journey." },
  ],
};

// GET reviews for a book
router.get("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;

    // Fetch real reviews from DB
    const realReviews = await BookReview.find({ bookId }).sort({ createdAt: -1 });

    // Merge fake + real reviews
    const combinedReviews = [
      ...(FAKE_REVIEWS[bookId] || []),
      ...realReviews.map((r) => ({
        email: r.email,
        rating: r.rating,
        comment: r.comment,
      })),
    ];

    res.json(combinedReviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json([]);
  }
});

// POST a new review
router.post("/:bookId", async (req, res) => {
  try {
    const { bookId } = req.params;
    const { email, rating, comment } = req.body;

    if (!email || !rating || !comment) {
      return res.status(400).json({ error: "Missing data" });
    }

    const newReview = new BookReview({ bookId, email, rating, comment });
    await newReview.save();

    res.json({ success: true, review: newReview });
  } catch (error) {
    console.error("Error saving review:", error);
    res.status(500).json({ success: false });
  }
});

module.exports = router;