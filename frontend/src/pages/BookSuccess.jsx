import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = "https://gishmaf-website-1.onrender.com";

export default function BookSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [bookUrl, setBookUrl] = useState(null);
  const [bookId, setBookId] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const email = localStorage.getItem("email");

  // ===============================
  // VERIFY PAYMENT
  // ===============================
  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/books/verify-book-session?session_id=${sessionId}`
        );

        const data = await res.json();

        if (data.success) {
          setBookUrl(data.bookUrl);
          setBookId(data.bookId);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [sessionId]);

  // ===============================
  // FETCH REVIEWS (AUTO REFRESH)
  // ===============================
  useEffect(() => {
    if (!bookId) return;

    const fetchReviews = async () => {
      const res = await fetch(`${API_URL}/api/reviews/${bookId}`);
      const data = await res.json();
      setReviews(data);
    };

    fetchReviews();
    const interval = setInterval(fetchReviews, 5000);

    return () => clearInterval(interval);
  }, [bookId]);

  const handleReview = async () => {
    try {
      await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          bookId,
          rating: Number(rating),
          comment,
        }),
      });

      setComment("");
      alert("Review submitted!");
    } catch (err) {
      alert("Failed to submit review");
    }
  };

  const average =
    reviews.length > 0
      ? (
          reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length
        ).toFixed(1)
      : "0.0";

  if (loading) return <h2>Verifying payment...</h2>;
  if (!bookUrl) return <h2>Payment not verified.</h2>;

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🎉 Purchase Successful</h1>

      <a href={bookUrl} target="_blank" rel="noreferrer">
        <button>📥 Download Book</button>
      </a>

      {/* ⭐ Average Display */}
      <h3 style={{ marginTop: "30px" }}>
        ⭐ {average} ({reviews.length} reviews)
      </h3>

      {/* ⭐ Review Form */}
      <div style={{ marginTop: "20px" }}>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="5">⭐⭐⭐⭐⭐</option>
          <option value="4">⭐⭐⭐⭐</option>
          <option value="3">⭐⭐⭐</option>
          <option value="2">⭐⭐</option>
          <option value="1">⭐</option>
        </select>

        <br /><br />

        <textarea
          placeholder="Write your review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />

        <br /><br />

        <button onClick={handleReview}>Submit Review</button>
      </div>

      {/* ⭐ Reviews List */}
      <div style={{ marginTop: "40px", maxWidth: "600px", marginInline: "auto" }}>
        {reviews.map((r, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              marginBottom: "10px",
              borderRadius: "8px",
            }}
          >
            <strong>⭐ {r.rating}</strong>
            <p>{r.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}