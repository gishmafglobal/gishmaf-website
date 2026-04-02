import React, { useState, useEffect } from "react";
import axios from "axios";

const BOOKS = [
  { id: "book1", title: "Escape from the Street", price: 400 },
  { id: "book2", title: "A Lonely Life Survivor", price: 420 },
];

export default function Books() {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState({}); // { bookId: [reviews] }

  useEffect(() => {
    // Fetch reviews for each book
    BOOKS.forEach(async (book) => {
      try {
        console.log(`📥 Fetching reviews for: ${book.id}`);
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/books/reviews/${book.id}`
        );
        setReviews((prev) => ({ ...prev, [book.id]: res.data }));
      } catch (err) {
        console.error(`❌ Review fetch failed for ${book.id}:`, err.response?.status || err.message);
      }
    });
  }, []);

  const handlePurchase = async (bookId) => {
    try {
      setLoading(true);
      console.log(`🚀 Starting purchase: ${bookId}`);

      // Send purchase request to backend
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/books/purchase`,
        { email: "customer@example.com", bookId } // replace with actual user email
      );

      if (!res.data?.url) {
        console.error("🔥 Purchase failed: No checkout URL returned");
        alert("Payment failed: No checkout URL returned");
        setLoading(false);
        return;
      }

      console.log("✅ Purchase response:", res.data);
      window.location.href = res.data.url; // redirect to Stripe checkout
    } catch (err) {
      console.error("🔥 Purchase error:", err.response?.data || err.message);
      alert("Payment failed. Check console for details.");
      setLoading(false);
    }
  };

  return (
    <div className="books-container">
      {BOOKS.map((book) => (
        <div key={book.id} className="book-card">
          <h2>{book.title}</h2>
          <p>Price: ${book.price / 100}</p>

          <button
            onClick={() => handlePurchase(book.id)}
            disabled={loading}
          >
            {loading ? "Processing..." : "Buy Now"}
          </button>

          <div className="reviews">
            <h4>Reviews:</h4>
            {reviews[book.id]?.length ? (
              <ul>
                {reviews[book.id].map((r) => (
                  <li key={r._id}>
                    {r.rating}★ - {r.comment} by {r.email}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}