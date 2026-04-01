const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const BookOrder = require("../models/BookOrder");

// GET REVIEWS
router.get("/:bookId", async (req, res) => {
  const reviews = await Review.find({ bookId: req.params.bookId }).sort({ createdAt: -1 });
  res.json(reviews);
});

// ADD REVIEW
router.post("/:bookId", async (req, res) => {
  const { email, rating, comment } = req.body;
  const { bookId } = req.params;

  const purchased = await BookOrder.findOne({ email, bookId });

  const review = await Review.create({
    bookId,
    email,
    rating,
    comment,
    verified: !!purchased,
  });

  res.json(review);
});

module.exports = router;