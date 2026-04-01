import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = "https://gishmaf-website-1.onrender.com";

// Fake reviews for testing
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
    { email: "joy@gmailo.com", rating: 5, comment: "really nice and a good book!" },
  ],
};

export default function BookSuccess() {
  const [searchParams] = useSearchParams();
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [bookId, setBookId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem("email") || "test@gmail.com");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const id = searchParams.get("bookId") || "book1";
    setBookId(id);

    // Direct test download (safe fallback)
    setDownloadUrl(`${API_URL}/api/books/test-book/${id}`);
  }, [searchParams]);

  useEffect(() => {
    if (bookId) setReviews(FAKE_REVIEWS[bookId] || []);
  }, [bookId]);

  const submitReview = () => {
    if (!comment) return alert("Enter comment");

    setReviews((prev) => [...prev, { email, rating, comment }]);
    setComment("");
  };

  if (!downloadUrl)
    return (
      <h2 style={{ textAlign: "center", marginTop: 80 }}>
        Preparing your book...
      </h2>
    );

  return (
    <div
      style={{
        padding: "40px 20px",
        maxWidth: "900px",
        margin: "auto",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        🎉 Purchase Successful
      </h1>

      <div style={{ textAlign: "center", marginBottom: 50 }}>
        <a href={downloadUrl} target="_blank" rel="noreferrer">
          <button
            style={{
              background: "#FFA41C",
              padding: "14px 35px",
              border: "none",
              fontWeight: "bold",
              cursor: "pointer",
              borderRadius: "8px",
              fontSize: "16px",
              boxShadow: "0 4px 10px rgba(0,0,0,0.15)",
            }}
          >
            📥 Download Book
          </button>
        </a>
      </div>

      <h2 style={{ marginBottom: 20 }}>Customer Reviews</h2>

      <div
        style={{
          marginBottom: 40,
          padding: 20,
          borderRadius: 10,
          background: "#f9f9f9",
        }}
      >
        <div style={{ fontSize: 28, marginBottom: 10 }}>
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              onClick={() => setRating(n)}
              style={{
                cursor: "pointer",
                color: n <= rating ? "#FFA41C" : "#ccc",
              }}
            >
              ★
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your review"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{
            width: "100%",
            padding: 12,
            borderRadius: 8,
            border: "1px solid #ddd",
            marginBottom: 10,
          }}
        />

        <button
          onClick={submitReview}
          style={{
            background: "#232F3E",
            color: "white",
            padding: "10px 20px",
            border: "none",
            borderRadius: 6,
            cursor: "pointer",
          }}
        >
          Submit Review
        </button>
      </div>

      {reviews.map((r, i) => (
        <div
          key={i}
          style={{
            padding: "20px 0",
            borderBottom: "1px solid #eee",
          }}
        >
          <div style={{ fontWeight: "bold" }}>{r.email}</div>
          <div style={{ color: "#FFA41C", margin: "5px 0" }}>
            {"★".repeat(r.rating)}
          </div>
          <p style={{ margin: 0 }}>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}