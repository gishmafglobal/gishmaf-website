

// const express = require("express");
// const router = express.Router();
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
// const BookOrder = require("../models/BookOrder");

// // ===============================
// // BOOK CONFIG
// // ===============================
// const BOOKS = {
//   book1: {
//     title: "Escape from the Street",
//     price: 400,
//     pdf: "EFTS BOOK.pdf",
//   },
//   book2: {
//     title: "A Lonely Life Survivor",
//     price: 420,
//     pdf: "Lonely Suvivor.pdf",
//   },
// };

// // ===============================
// // CREATE BOOK CHECKOUT SESSION
// // ===============================
// router.post("/create-book-session", async (req, res) => {
//   try {
//     const { bookId, email } = req.body;

//     if (!bookId || !email)
//       return res.status(400).json({ error: "Missing bookId or email" });

//     const book = BOOKS[bookId];
//     if (!book)
//       return res.status(400).json({ error: "Invalid bookId" });

//     const session = await stripe.checkout.sessions.create({
//       mode: "payment",
//       payment_method_types: ["card"],
//       customer_email: email,
//       metadata: { bookId },

//       line_items: [
//         {
//           price_data: {
//             currency: "usd",
//             product_data: { name: book.title },
//             unit_amount: book.price,
//           },
//           quantity: 1,
//         },
//       ],

//       success_url: `${process.env.FRONTEND_URL}/book-success?session_id={CHECKOUT_SESSION_ID}`,
//       cancel_url: `${process.env.FRONTEND_URL}/books`,
//     });

//     res.json({ url: session.url });

//   } catch (error) {
//     console.error("🔥 Stripe Error:", error);
//     res.status(500).json({ error: "Checkout failed" });
//   }
// });

// // ===============================
// // VERIFY BOOK SESSION (FIXED)
// // ===============================
// router.get("/verify-book-session", async (req, res) => {
//   try {
//     const { session_id } = req.query;

//     if (!session_id)
//       return res.status(400).json({ success: false });

//     const session = await stripe.checkout.sessions.retrieve(session_id);

//     if (session.payment_status !== "paid")
//       return res.json({ success: false });

//     const bookId = session.metadata.bookId;
//     const book = BOOKS[bookId];

//     if (!book)
//       return res.json({ success: false });

//     const bookUrl = `${process.env.FRONTEND_URL}/pdfs/${book.pdf}`;

//     res.json({
//       success: true,
//       bookUrl,
//       bookId,
//     });

//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ success: false });
//   }
// });

// module.exports = router;

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const path = require("path");

// ===============================
// BOOK CONFIG
// ===============================
const BOOKS = {
  book1: {
    title: "Escape from the Street",
    price: 400,
    pdf: "EFTS BOOK.pdf",
  },
  book2: {
    title: "A Lonely Life Survivor",
    price: 420,
    pdf: "Lonely Suvivor.pdf",
  },
};

// ===============================
// CREATE BOOK CHECKOUT SESSION
// ===============================
router.post("/create-book-session", async (req, res) => {
  try {
    const { bookId, email } = req.body;

    if (!bookId || !email) {
      return res.status(400).json({ error: "Missing bookId or email" });
    }

    const book = BOOKS[bookId];

    if (!book) {
      return res.status(400).json({ error: "Invalid bookId" });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,

      metadata: {
        bookId,
      },

      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: book.title,
            },
            unit_amount: book.price,
          },
          quantity: 1,
        },
      ],

      success_url: `${process.env.FRONTEND_URL}/book-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/books`,
    });

    res.json({ url: session.url });

  } catch (error) {
    console.error("🔥 Stripe Error:", error);
    res.status(500).json({ error: "Checkout failed" });
  }
});

// ===============================
// VERIFY BOOK SESSION
// ===============================
router.get("/verify-book-session", async (req, res) => {
  try {
    const { session_id } = req.query;

    if (!session_id) {
      return res.status(400).json({ success: false });
    }

    const session = await stripe.checkout.sessions.retrieve(session_id);

    if (session.payment_status !== "paid") {
      return res.json({ success: false });
    }

    const bookId = session.metadata.bookId;
    const book = BOOKS[bookId];

    if (!book) {
      return res.json({ success: false });
    }

    // ✅ IMPORTANT: use backend download route (not direct file)
    const bookUrl = `${process.env.BACKEND_URL}/api/books/download/${encodeURIComponent(book.pdf)}`;

    res.json({
      success: true,
      bookUrl,
      bookId,
    });

  } catch (err) {
    console.error("🔥 Verify Error:", err);
    res.status(500).json({ success: false });
  }
});

// ===============================
// DOWNLOAD ROUTE (VERY IMPORTANT)
// ===============================
router.get("/download/:file", (req, res) => {
  try {
    const fileName = req.params.file;

    const filePath = path.join(__dirname, "../public/pdfs", fileName);

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error("❌ Download error:", err);
        res.status(500).send("File not found or cannot download");
      }
    });

  } catch (error) {
    console.error("🔥 Download route error:", error);
    res.status(500).send("Download failed");
  }
});

module.exports = router;