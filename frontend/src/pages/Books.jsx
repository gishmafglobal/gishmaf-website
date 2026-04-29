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

  book3: [
    
    { email: "dola@yahoo.com", rating: 5, comment: "This is lovely,still reading and loving the flow" },
    { email: "djmanny@gmail.com", rating: 3, comment: "This is like a wow for me honestly" },
    { email: "anny@doha.com", rating: 5, comment: "I love this concept!" },
    
  ],
};

// real review 
const fetchRealReviews = async (bookId) => {
  try {
    const res = await fetch(`${API_URL}/api/books/reviews/${bookId}`);
    const data = await res.json();
    return data || [];
  } catch (err) {
    console.error("Failed to fetch real reviews:", err);
    return [];
  }
};

export default function Books() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [loadingBook, setLoadingBook] = useState(null);
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState({});

  const books = [
    { id: "book1", title: "Escape from the Street", image: "/images/book1.jpg" },
    { id: "book2", title: "A Lonely Life Survivor", image: "/images/book2.jpg" },
    { id: "book3", title: "The Diasporal Love Story(Complete Season 1)", image: "/images/book3.png" },
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
  const loadAllReviews = async () => {
    const combined = {};
    const ratingData = {};

    for (const book of books) {
      const fake = FAKE_REVIEWS[book.id] || [];
      const real = await fetchRealReviews(book.id);

      // ✅ Merge both
      const allReviews = [...fake, ...real];

      combined[book.id] = allReviews;

      // ✅ Calculate ratings
      if (allReviews.length > 0) {
        const avg =
          allReviews.reduce((acc, r) => acc + Number(r.rating), 0) /
          allReviews.length;

        ratingData[book.id] = {
          average: avg.toFixed(1),
          count: allReviews.length,
        };
      } else {
        ratingData[book.id] = { average: "0.0", count: 0 };
      }
    }

    setReviews(combined);
    setRatings(ratingData);
  };

  loadAllReviews();
}, []);

// alowing users to add their reviews 
const submitReview = async (bookId, rating, comment) => {
  if (!rating || !comment) {
    alert("Please add rating and comment");
    return;
  }

  try {
    const res = await fetch(`${API_URL}/api/books/review`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, bookId, rating, comment }),
    });

    const data = await res.json();

    if (data.error) {
      alert(data.error);
      return;
    }

    alert("✅ Review added!");

    // ✅ REFRESH REVIEWS CLEANLY
    const real = await fetchRealReviews(bookId);

    const allReviews = [...FAKE_REVIEWS[bookId], ...real];

setReviews((prev) => ({
  ...prev,
  [bookId]: allReviews,
}));

// ✅ update rating instantly
const avg =
  allReviews.reduce((acc, r) => acc + Number(r.rating), 0) /
  allReviews.length;

setRatings((prev) => ({
  ...prev,
  [bookId]: {
    average: avg.toFixed(1),
    count: allReviews.length,
  },
}));

  } catch (err) {
    console.error(err);
  }
};
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

            {/* REVIEW INPUT */}
            {email && (
<div style={{ marginTop: "15px" }}>
  <select
    onChange={(e) =>
      setRatings((prev) => ({
        ...prev,
        [book.id]: {
          ...prev[book.id],
          userRating: e.target.value,
        },
      }))
    }
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      marginBottom: "10px",
    }}
  >
    <option value="">Rate this book</option>
    <option value="5">⭐ 5 - Excellent</option>
    <option value="4">⭐ 4 - Good</option>
    <option value="3">⭐ 3 - Average</option>
    <option value="2">⭐ 2 - Poor</option>
    <option value="1">⭐ 1 - Bad</option>
  </select>

  <textarea
    placeholder="Write your review..."
    onChange={(e) =>
      setRatings((prev) => ({
        ...prev,
        [book.id]: {
          ...prev[book.id],
          userComment: e.target.value,
        },
      }))
    }
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      marginBottom: "10px",
    }}
  />

  <button
    onClick={() =>
      submitReview(
        book.id,
        ratings[book.id]?.userRating,
        ratings[book.id]?.userComment
      )
    }
    style={{
      width: "100%",
      padding: "10px",
      borderRadius: "8px",
      background: "#1a73e8",
      color: "#fff",
      border: "none",
      cursor: "pointer",
    }}
  >
    Submit Review
  </button>
</div>
)}

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