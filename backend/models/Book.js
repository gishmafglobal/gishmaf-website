const mongoose = require("mongoose");

const BookSchema = new mongoose.Schema({
  title: String,
  author: String,
  cover: String,
  readLink: String,
});

module.exports = mongoose.model("Book", BookSchema);
