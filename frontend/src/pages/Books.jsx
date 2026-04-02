import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./books.css";

// ===================== ENV =====================
const API_URL = import.meta.env.VITE_API_URL;
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY;

// Stripe init
const stripePromise = STRIPE_PUBLIC_KEY
  ? loadStripe(STRIPE_PUBLIC_KEY)
  : null;

// ===================== FAKE REVIEWS =====================
const FAKE_REVIEWS = {
  book1: [
    { email: "alice@gmail.com", rating: 5, comment: "Absolutely loved this book!" },
    { email: "john@yahoo.com", rating: 5, comment: "Incredible story!" },
  ],
  book2: [
    { email: "mike@yandex.com", rating: 5, comment: "Changed my perspective!" },
    { email: "sarah@outlook.com", rating: 5, comment: "Very touching story." },
  ],
};

// ===================== COMPONENT =====================
export default function Books() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [loadingBook, setLoadingBook] = useState(null);
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState({});

  const books = [
    { id: "book1", title: "Escape from the Street", image: "/images/book1.jpg" },
    { id: "book2", title: "A Lonely Life Survivor", image: "/images/book2.jpg" },
  ];

  // ===================== FETCH REVIEWS =====================
  const fetchReviews = async () => {
    try {
      const updatedRatings = {};
      const updatedReviews = {};

      for (const book of books) {
        console.log("📥 Fetching reviews for:", book.id);

        const res = await fetch(`${API_URL}/api/books/reviews/${book.id}`);

        if (!res.ok) {
          console.error("❌ Review fetch failed:", res.status);
          continue;
        }

        const text = await res.text();

        let realReviews = [];
        try {
          realReviews = JSON.parse(text);
        } catch (err) {
          console.error("❌ Review not JSON:", text);
        }

        const combined = [
          ...(FAKE_REVIEWS[book.id] || []),
          ...(realReviews || []),
        ];

        updatedReviews[book.id] = combined;

        if (combined.length > 0) {
          const avg =
            combined.reduce((acc, r) => acc + r.rating, 0) /
            combined.length;

          updatedRatings[book.id] = {
            average: avg.toFixed(1),
            count: combined.length,
          };
        } else {
          updatedRatings[book.id] = { average: "0.0", count: 0 };
        }
      }

      setReviews(updatedReviews);
      setRatings(updatedRatings);
    } catch (err) {
      console.error("🔥 fetchReviews error:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ===================== MASK EMAIL =====================
  const maskEmail = (e) => {
    if (!e) return "";
    const [name, domain] = e.split("@");
    return name.slice(0, 2) + "****@" + domain;
  };

  // ===================== PURCHASE =====================
  const handlePurchase = async (bookId) => {
    console.log("🚀 Starting purchase:", bookId);

    if (!email || !email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    if (!API_URL) {
      alert("API URL missing");
      return;
    }

    if (!stripePromise) {
      alert("Stripe not initialized");
      return;
    }

    localStorage.setItem("email", email);
    setLoadingBook(bookId);

    try {
      const res = await fetch(`${API_URL}/api/books/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, bookId }),
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("❌ Backend not JSON:", text);
        alert("Server error. Check console.");
        return;
      }

      console.log("✅ Purchase response:", data);

      if (!data.sessionId) {
        alert(data.error || "No sessionId returned");
        return;
      }

      const stripe = await stripePromise;

      // ✅ NEW STRIPE METHOD
      await stripe.initCheckout({
        clientSecret: data.sessionId,
      });

    } catch (err) {
      console.error("🔥 Purchase error:", err);
      alert("Purchase failed: see console");
    } finally {
      setLoadingBook(null);
    }
  };

  // ===================== UI =====================
  return (
    <section className="books-page">
      <h1 className="books-title">📚 Our Books</h1>

      <div className="email-section">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />

            <h3>{book.title}</h3>

            <p>
              ⭐ {ratings[book.id]?.average || "0.0"} (
              {ratings[book.id]?.count || 0} reviews)
            </p>

            <button
              onClick={() => handlePurchase(book.id)}
              disabled={loadingBook === book.id}
              className="buy-button"
            >
              {loadingBook === book.id ? "Processing..." : "Buy Book"}
            </button>

            {/* REVIEWS */}
            <div className="reviews-section">
              {(reviews[book.id] || []).slice(0, 5).map((r, i) => (
                <div key={i} className="review-card">
                  <strong>{maskEmail(r.email)}</strong>
                  <div>⭐ {r.rating}</div>
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}