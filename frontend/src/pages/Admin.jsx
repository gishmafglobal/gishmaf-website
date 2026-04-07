// book.jsx

import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

// ✅ Safe env variables
const API_URL = import.meta.env.VITE_API_URL || "";
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || "";

// ✅ Stripe initialization with safety check
const stripePromise = STRIPE_PUBLIC_KEY ? loadStripe(STRIPE_PUBLIC_KEY) : null;
if (!STRIPE_PUBLIC_KEY) console.error("⚠️ Stripe public key is missing! Check your VITE_STRIPE_PUBLIC_KEY in .env and Render secrets.");

// Fake reviews
const FAKE_REVIEWS = {
  book1: [
    { email: "alice@gmail.com", rating: 5, comment: "Absolutely loved this book!" },
    { email: "john@yahoo.com", rating: 5, comment: "Incredible story!" },
    { email: "sarah@yahoo.com", rating: 4, comment: "its a wow for me!" },
    { email: "usman@yandex.com", rating: 4, comment: "its too long man,but quite ok though" },
    { email: "steve@outlook.com", rating: 5, comment: "good one bro!" },
    { email: "ayomide@hotmail.com", rating: 5, comment: "This is deep!" },
  ],
  book2: [
    { email: "mike@yandex.com", rating: 5, comment: "Changed my perspective!" },
    { email: "sarah@outlook.com", rating: 5, comment: "Very touching story." },
    { email: "dola@yahoo.com", rating: 5, comment: "quite Incredible!" },
    { email: "djmanny@gmail.com", rating: 3, comment: "nice one !" },
    { email: "anny@doha.com", rating: 5, comment: "lovely!" },
    { email: "tatu@yandex.com", rating: 4, comment: "hmm!" },
    { email: "youjin@qq.com", rating: 5, comment: "this is really recommendable!" },
    { email: "joy@gmail.com", rating: 5, comment: "really nice and a good book!" },
  ],
};

export default function Books() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [loadingBook, setLoadingBook] = useState(null);
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState({});

  const books = [
    { id: "book1", title: "Escape from the Street", image: "/images/book1.jpg" },
    { id: "book2", title: "A Lonely Life Survivor", image: "/images/book2.jpg" },
  ];

  const maskEmail = (e) => {
    if (!e) return "";
    const [name, domain] = e.split("@");
    return name.slice(0, 2) + "****@" + domain;
  };

  const handlePurchase = async (bookId) => {
    if (!email.includes("@")) { alert("Enter a valid email"); return; }
    if (!stripePromise) { alert("Stripe public key is missing. Check your env variables."); return; }
    if (!API_URL) { alert("API URL is missing. Check your env variables."); return; }

    localStorage.setItem("email", email);
    setLoadingBook(bookId);

    try {
      console.log("[HANDLE PURCHASE] Starting purchase for book:", bookId);
      console.log("[HANDLE PURCHASE] Using API_URL:", API_URL);
      console.log("[HANDLE PURCHASE] Using STRIPE_PUBLIC_KEY:", STRIPE_PUBLIC_KEY?.substring(0, 10) + "…");

      const res = await fetch(`${API_URL}/api/books/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, bookId }),
      });

      console.log("[HANDLE PURCHASE] Response status:", res.status);
      const text = await res.text();
      console.log("[HANDLE PURCHASE] Raw response text:", text);

      let data;
      try { data = JSON.parse(text); } 
      catch (err) {
        console.error("❌ NOT JSON RESPONSE:", text);
        alert("Server returned invalid response:\n" + text);
        return;
      }

      console.log("[HANDLE PURCHASE] Backend response:", data);

      if (data.sessionId) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert(`Purchase failed: checkout session not created. Backend message: ${data.error || "no error info"}`);
      }
    } catch (err) {
      console.error("[HANDLE PURCHASE ERROR]", err);
      alert("Purchase failed: see console for details");
    } finally {
      setLoadingBook(null);
    }
  };

  useEffect(() => {
    const r = {};
    const avg = {};
    for (const b of books) {
      r[b.id] = FAKE_REVIEWS[b.id] || [];
      const reviewsList = r[b.id];
      avg[b.id] = reviewsList.length > 0
        ? { average: (reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length).toFixed(1), count: reviewsList.length }
        : { average: "0.0", count: 0 };
    }
    setReviews(r);
    setRatings(avg);
  }, []);

  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh", padding: "60px 20px", fontFamily: "Segoe UI, sans-serif", color: "#111" }}>
      <h1 style={{ textAlign: "center", fontSize: "42px", fontWeight: "700", marginBottom: "30px" }}>📚 Our Books</h1>

      {/* Email input */}
      <div style={{ maxWidth: "400px", margin: "0 auto 40px auto" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
        />
      </div>

      {/* Book cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        {books.map((book) => (
          <div key={book.id} style={{ background: "#fff", borderRadius: "20px", padding: "25px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
            <img src={book.image} alt={book.title} style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "15px", marginBottom: "20px" }} />
            <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "10px" }}>{book.title}</h2>
            <div style={{ fontSize: "16px", fontWeight: "600", color: "#f59e0b", marginBottom: "15px" }}>⭐ {ratings[book.id]?.average} ({ratings[book.id]?.count} reviews)</div>
            <button disabled={loadingBook === book.id} onClick={() => handlePurchase(book.id)} style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "none", backgroundColor: "#111", color: "#fff", fontSize: "15px", fontWeight: "600", cursor: "pointer", marginBottom: "25px" }}>
              {loadingBook === book.id ? "Processing..." : "Buy Book"}
            </button>

            <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>Reviews</h4>
            {(reviews[book.id] || []).map((r, index) => (
              <div key={index} style={{ backgroundColor: "#f9fafb", padding: "15px", borderRadius: "12px", marginBottom: "12px", border: "1px solid #e5e7eb" }}>
                <div style={{ fontWeight: "600", fontSize: "14px", marginBottom: "5px" }}>{maskEmail(r.email)}</div>
                <div style={{ color: "#f59e0b", fontWeight: "600", marginBottom: "6px" }}>⭐ {r.rating}</div>
                <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.6", margin: 0 }}>{r.comment}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}


// route/book.js
const express = require("express");
const router = express.Router();
const Stripe = require("stripe");

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const BookOrder = require("../models/BookOrder");
const Review = require("../models/Review");

// =========================
// CREATE CHECKOUT SESSION (FIXED)
// =========================
router.post("/purchase", async (req, res) => {
  try {
    const { email, bookId } = req.body;

    console.log("📥 Purchase request:", email, bookId);

    const prices = {
      book1: 400,
      book2: 420,
    };

    if (!email || !bookId) {
      return res.status(400).json({ error: "Missing email or bookId" });
    }

    if (!prices[bookId]) {
      return res.status(400).json({ error: "Invalid bookId" });
    }

    // 🔥 LOG ENV VALUES (CRITICAL)
    console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
    console.log("STRIPE KEY EXISTS:", !!process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: email,
      metadata: { bookId },
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Book: ${bookId}`,
            },
            unit_amount: prices[bookId],
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/book-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/books`,
    });

    console.log("✅ SESSION CREATED:", session.id);

    return res.status(200).json({ sessionId: session.id });

  } catch (err) {
    console.error("🔥 STRIPE ERROR FULL:", err);

    return res.status(500).json({
      error: err.message || "Stripe failed",
    });
  }
});
// =========================
// VERIFY SESSION & RETURN DOWNLOAD
// =========================
router.get("/verify-session", async (req, res) => {
  try {
    const { session_id } = req.query;
    if (!session_id) return res.status(400).json({ error: "Missing session_id" });

    const session = await stripe.checkout.sessions.retrieve(session_id);
    console.log("[VERIFY] Retrieved session:", session.id, "status:", session.payment_status);

    if (session.payment_status !== "paid") {
      return res.status(400).json({ error: "Payment not completed" });
    }

    const { bookId } = session.metadata;
    const email = session.customer_email;

    let order = await BookOrder.findOne({ email, bookId });

    if (!order) {
      const downloadToken = Math.random().toString(36).substring(2, 15);
      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 7);

      order = await BookOrder.create({
        email,
        bookId,
        downloadToken,
        expiryDate,
      });
      console.log("[VERIFY] New order created with token:", downloadToken);
    } else {
      console.log("[VERIFY] Order already exists for", email, bookId);
    }

    res.json({
      downloadUrl: `${process.env.SERVER_URL}/api/books/download/${order.downloadToken}`,
      bookId,
      email,
    });
  } catch (err) {
    console.error("[VERIFY] Verification failed:", err.message, err);
    res.status(500).json({ error: "Verification failed, check server logs" });
  }
});

// =========================
// SECURE DOWNLOAD
// =========================
router.get("/download/:token", async (req, res) => {
  try {
    const { token } = req.params;
    const order = await BookOrder.findOne({ downloadToken: token });

    if (!order) return res.status(403).json({ error: "Invalid link" });
    if (new Date() > order.expiryDate) return res.status(403).json({ error: "Link expired" });

    console.log("[DOWNLOAD] Serving book:", order.bookId, "for token:", token);
    res.redirect(`/pdfs/${order.bookId}.pdf`);
  } catch (err) {
    console.error("[DOWNLOAD] Failed:", err.message, err);
    res.status(500).json({ error: "Download failed" });
  }
});

// =========================
// ADD REVIEW
// =========================
router.post("/review", async (req, res) => {
  try {
    const { email, bookId, rating, comment } = req.body;
    const purchased = await BookOrder.findOne({ email, bookId });
    if (!purchased)
      return res.status(403).json({ error: "You must purchase this book before reviewing." });

    const review = await Review.create({ email, bookId, rating, comment });
    console.log("[REVIEW] New review:", review);
    res.json(review);
  } catch (err) {
    console.error("[REVIEW] Failed:", err.message, err);
    res.status(500).json({ error: "Review failed" });
  }
});

// =========================
// GET REVIEWS
// =========================
router.get("/reviews/:bookId", async (req, res) => {
  try {
    const reviews = await Review.find({ bookId: req.params.bookId }).sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    console.error("[GET REVIEWS] Failed:", err.message, err);
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
});

module.exports = router;


