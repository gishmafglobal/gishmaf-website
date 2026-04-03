import { useState, useEffect } from "react";

// ========================================
// ENV
// ========================================
const API_URL = import.meta.env.VITE_API_URL;

if (!API_URL) {
  console.error("❌ VITE_API_URL is missing in your .env file");
}

// ========================================
// FAKE REVIEWS
// ========================================
const FAKE_REVIEWS = {
  book1: [
    { email: "alice@gmail.com", rating: 5, comment: "Absolutely loved this book!" },
    { email: "john@yahoo.com", rating: 5, comment: "Incredible story!" },
    { email: "sarah@yahoo.com", rating: 4, comment: "It's a wow for me!" },
    { email: "usman@yandex.com", rating: 4, comment: "Too long but quite good." },
    { email: "steve@outlook.com", rating: 5, comment: "Good one bro!" },
    { email: "ayomide@hotmail.com", rating: 5, comment: "This is deep!" },
  ],
  book2: [
    { email: "mike@yandex.com", rating: 5, comment: "Changed my perspective!" },
    { email: "sarah@outlook.com", rating: 5, comment: "Very touching story." },
    { email: "dola@yahoo.com", rating: 5, comment: "Quite incredible!" },
    { email: "djmanny@gmail.com", rating: 3, comment: "Nice one!" },
    { email: "anny@doha.com", rating: 5, comment: "Lovely!" },
    { email: "tatu@yandex.com", rating: 4, comment: "Hmm!" },
    { email: "youjin@qq.com", rating: 5, comment: "Highly recommendable!" },
    { email: "joy@gmail.com", rating: 5, comment: "Really nice book!" },
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

  // ========================================
  // MASK EMAIL
  // ========================================
  const maskEmail = (e) => {
    if (!e) return "";
    const [name, domain] = e.split("@");
    return name.slice(0, 2) + "****@" + domain;
  };

  // ========================================
  // PURCHASE FUNCTION
  // ========================================
  const handlePurchase = async (bookId) => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!API_URL) {
      alert("API configuration error. Please contact support.");
      return;
    }

    localStorage.setItem("email", email);
    setLoadingBook(bookId);

    try {
      const response = await fetch(`${API_URL}/api/books/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          bookId,
        }),
      });

      if (!response.ok) {
        throw new Error("Server error");
      }

      const data = await response.json();

      if (!data || !data.url) {
        console.error("Stripe session URL missing:", data);
        alert("Checkout failed. Please try again.");
        return;
      }

      // ✅ Redirect to Stripe Checkout
      window.location.href = data.url;

    } catch (error) {
      console.error("❌ PURCHASE ERROR:", error);
      alert("Payment initialization failed. Please try again.");
    } finally {
      setLoadingBook(null);
    }
  };

  // ========================================
  // LOAD REVIEWS
  // ========================================
  useEffect(() => {
    const r = {};
    const avg = {};

    for (const b of books) {
      r[b.id] = FAKE_REVIEWS[b.id] || [];

      const list = r[b.id];
      avg[b.id] =
        list.length > 0
          ? {
              average: (
                list.reduce((acc, r) => acc + r.rating, 0) / list.length
              ).toFixed(1),
              count: list.length,
            }
          : { average: "0.0", count: 0 };
    }

    setReviews(r);
    setRatings(avg);
  }, []);

  // ========================================
  // UI
  // ========================================
  return (
    <div
      style={{
        backgroundColor: "#f4f6f9",
        minHeight: "100vh",
        padding: "60px 20px",
        fontFamily: "Segoe UI, sans-serif",
        color: "#111",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          fontSize: "42px",
          fontWeight: "700",
          marginBottom: "30px",
        }}
      >
        📚 Our Books
      </h1>

      <div style={{ maxWidth: "400px", margin: "0 auto 40px auto" }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            border: "1px solid #ccc",
            fontSize: "14px",
          }}
        />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {books.map((book) => (
          <div
            key={book.id}
            style={{
              background: "#fff",
              borderRadius: "20px",
              padding: "25px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={book.image}
              alt={book.title}
              style={{
                width: "100%",
                height: "300px",
                objectFit: "cover",
                borderRadius: "15px",
                marginBottom: "20px",
              }}
            />

            <h2 style={{ fontSize: "22px", fontWeight: "600" }}>
              {book.title}
            </h2>

            <div
              style={{
                fontSize: "16px",
                fontWeight: "600",
                color: "#f59e0b",
                margin: "10px 0 15px",
              }}
            >
              ⭐ {ratings[book.id]?.average} (
              {ratings[book.id]?.count} reviews)
            </div>

            <button
              disabled={loadingBook === book.id}
              onClick={() => handlePurchase(book.id)}
              style={{
                width: "100%",
                padding: "14px",
                borderRadius: "10px",
                border: "none",
                backgroundColor: "#111",
                color: "#fff",
                fontSize: "15px",
                fontWeight: "600",
                cursor: "pointer",
                marginBottom: "25px",
              }}
            >
              {loadingBook === book.id ? "Processing..." : "Buy Book"}
            </button>

            <h4 style={{ fontSize: "18px", fontWeight: "600" }}>
              Reviews
            </h4>

            {(reviews[book.id] || []).map((r, index) => (
              <div
                key={index}
                style={{
                  backgroundColor: "#f9fafb",
                  padding: "15px",
                  borderRadius: "12px",
                  marginTop: "12px",
                  border: "1px solid #e5e7eb",
                }}
              >
                <div style={{ fontWeight: "600", fontSize: "14px" }}>
                  {maskEmail(r.email)}
                </div>
                <div style={{ color: "#f59e0b", fontWeight: "600" }}>
                  ⭐ {r.rating}
                </div>
                <p style={{ fontSize: "14px", margin: 0 }}>
                  {r.comment}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}