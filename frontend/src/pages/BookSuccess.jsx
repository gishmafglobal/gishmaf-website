import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = "https://gishmaf-website-1.onrender.com";

// Fake reviews for testing
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

export default function BookSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id"); // Optional for testing

  const [downloadUrl, setDownloadUrl] = useState(null);
  const [bookId, setBookId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  // For testing, bypass Stripe and call backend directly
  useEffect(() => {
    const urlParamsBookId = searchParams.get("bookId"); // optional
    const id = urlParamsBookId || "book1";
    setBookId(id);

    if (email && id) {
      fetch(`${API_URL}/api/books/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, bookId: id }),
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.downloadUrl) setDownloadUrl(data.downloadUrl);
        })
        .catch((err) => console.error(err));
    }
  }, [email, searchParams]);

  // Load fake reviews
  useEffect(() => {
    if (bookId) setReviews(FAKE_REVIEWS[bookId] || []);
  }, [bookId]);

  const submitReview = async () => {
    if (!comment || !email) return alert("Enter comment and email");

    // Optional: save to real backend later
    setReviews((prev) => [...prev, { email, rating, comment }]);
    setComment("");
  };

  if (!downloadUrl) return <h2>Preparing your book...</h2>;

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "auto" }}>
      <h1>🎉 Purchase Successful</h1>

      <a href={downloadUrl} target="_blank" rel="noreferrer">
        <button style={{
          background: "#FFA41C",
          padding: "12px 25px",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer"
        }}>
          📥 Download Book
        </button>
      </a>

      <h2 style={{ marginTop: 40 }}>Customer Reviews</h2>

      <div style={{ marginBottom: 30 }}>
        <div>
          {[1,2,3,4,5].map(n => (
            <span
              key={n}
              onClick={() => setRating(n)}
              style={{
                fontSize: 28,
                cursor: "pointer",
                color: n <= rating ? "#FFA41C" : "#ccc",
                transition: "0.3s"
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
          style={{ width: "100%", padding: 10, marginTop: 10 }}
        />

        <button
          onClick={submitReview}
          style={{
            marginTop: 10,
            background: "#232F3E",
            color: "white",
            padding: "10px 20px",
            border: "none"
          }}
        >
          Submit Review
        </button>
      </div>

      {reviews.map((r, i) => (
        <div
          key={i}
          style={{ borderBottom: "1px solid #ddd", padding: "15px 0" }}
        >
          <div style={{ fontWeight: "bold" }}>{r.email}</div>
          <div style={{ color: "#FFA41C" }}>{"★".repeat(r.rating)}</div>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}