import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = process.env.REACT_APP_API_URL;

export default function BookSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [downloadUrl, setDownloadUrl] = useState(null);
  const [bookId, setBookId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  useEffect(() => {
    const verify = async () => {
      const res = await fetch(
        `${API_URL}/api/books/verify-book-session?session_id=${sessionId}`
      );
      const data = await res.json();
      if (data.success) {
        setDownloadUrl(data.downloadUrl);
        setBookId(data.bookId);
        setEmail(data.email);
      }
    };
    verify();
  }, [sessionId]);

  useEffect(() => {
    if (!bookId) return;
    fetch(`${API_URL}/api/reviews/${bookId}`)
      .then((res) => res.json())
      .then(setReviews);
  }, [bookId]);

  const submitReview = async () => {
    await fetch(`${API_URL}/api/reviews/${bookId}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, rating, comment }),
    });
    setComment("");
    const updated = await fetch(`${API_URL}/api/reviews/${bookId}`).then((r) =>
      r.json()
    );
    setReviews(updated);
  };

  if (!downloadUrl) return <h2>Verifying payment...</h2>;

  return (
    <div style={{ padding: 40, maxWidth: 900, margin: "auto" }}>
      <h1>🎉 Purchase Successful</h1>

      <a href={downloadUrl}>
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

      {/* Review Form */}
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

      {/* Reviews List */}
      {reviews.map((r, i) => (
        <div
          key={i}
          style={{
            borderBottom: "1px solid #ddd",
            padding: "15px 0"
          }}
        >
          <div style={{ fontWeight: "bold" }}>
            {r.email} {r.verified && "✅ Verified Purchase"}
          </div>
          <div style={{ color: "#FFA41C" }}>
            {"★".repeat(r.rating)}
          </div>
          <p>{r.comment}</p>
        </div>
      ))}
    </div>
  );
}