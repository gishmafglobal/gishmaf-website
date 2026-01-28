// // const express = require("express");
// // const axios = require("axios");
// // const Book = require("../models/Book");

// // const router = express.Router();

// // // Fetch books from Open Library and save to DB
// // router.get("/fetch", async (req, res) => {
// //   try {
// //     const response = await axios.get(
// //       "https://openlibrary.org/search.json?q=programming"
// //     );

// //     const books = response.data.docs.slice(0, 20);

// //     for (let b of books) {
// //       const bookExists = await Book.findOne({ title: b.title });

// //       if (!bookExists) {
// //         await Book.create({
// //           title: b.title,
// //           author: b.author_name ? b.author_name[0] : "Unknown",
// //           cover: b.cover_i
// //             ? `https://covers.openlibrary.org/b/id/${b.cover_i}-L.jpg`
// //             : "",
// //           readLink: `https://openlibrary.org${b.key}`,
// //         });
// //       }
// //     }

// //     res.json({ message: "Books fetched and saved!" });
// //   } catch (err) {
// //     res.status(500).json(err);
// //   }
// // });

// // // Get all books from DB
// // router.get("/", async (req, res) => {
// //   const books = await Book.find();
// //   res.json(books);
// // });

// // module.exports = router;

// const express = require("express");
// const router = express.Router();

// router.get("/", (req, res) => {
//   res.json([
//     {
//       title: "Sample Book",
//       author: "Gishmaf",
//       cover: "https://via.placeholder.com/150",
//       readLink: "https://example.com"
//     }
//   ]);
// });

// module.exports = router;

const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([
    {
      title: "Sample Book",
      author: "Gishmaf",
      cover: "https://via.placeholder.com/150",
      readLink: "https://example.com"
    }
  ]);
});

module.exports = router;
