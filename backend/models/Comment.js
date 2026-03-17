// const mongoose = require("mongoose");

// const commentSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   message: String,
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// module.exports = mongoose.model("Comment", commentSchema);

const mongoose = require("mongoose");

const CommentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  message: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Comment", CommentSchema);
