// // const mongoose = require("mongoose");

// // const commentSchema = new mongoose.Schema({
// //   name: String,
// //   email: String,
// //   message: String,
// //   date: {
// //     type: Date,
// //     default: Date.now,
// //   },
// // });

// // module.exports = mongoose.model("Comment", commentSchema);
// const mongoose = require("mongoose");

// const commentSchema = new mongoose.Schema(
//   {
//     name: String,
//     email: String,
//     message: String,
//   },
//   { timestamps: true } // 👈 REQUIRED
// );

// module.exports = mongoose.model("Comment", commentSchema);

const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    message: String,
    likes: { type: Number, default: 0 }, // ✅ NEW
    replies: [
      {
        message: String,
        date: { type: Date, default: Date.now },
      },
    ], // ✅ NEW
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", commentSchema);