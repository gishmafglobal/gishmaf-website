import { useState, useEffect } from "react";
import "./books.css";

const API_URL = "https://gishmaf-website-1.onrender.com";

// Pre-populated fake reviews
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

export default function Books() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [myBooks, setMyBooks] = useState([]);
  const [loadingBook, setLoadingBook] = useState(null);
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState({});

  const books = [
    { id: "book1", title: "Escape from the Street", image: "/images/book1.jpg" },
    { id: "book2", title: "A Lonely Life Survivor", image: "/images/book2.jpg" },
  ];

  // Mask email for display
  const maskEmail = (e) => {
    if (!e) return "";
    const [name, domain] = e.split("@");
    return name.slice(0, 2) + "****@" + domain;
  };

  // Fetch purchased books
  const fetchMyBooks = async () => {
    if (!email) return;
    try {
      const res = await fetch(`${API_URL}/api/books/my-books?email=${email}`);
      const data = await res.json();
      if (data.success) setMyBooks(data.books);
    } catch (err) { console.error(err); }
  };

  // Handle purchase (bypass Stripe for testing)
  const handlePurchase = async (bookId) => {
    if (!email.includes("@")) { alert("Enter valid email"); return; }
    localStorage.setItem("email", email);
    setLoadingBook(bookId);
    try {
      const res = await fetch(`${API_URL}/api/books/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, bookId }),
      });
      const data = await res.json();
      if (data.downloadUrl) window.open(data.downloadUrl, "_blank");
    } catch (err) { console.error(err); alert("Purchase failed"); }
    finally { setLoadingBook(null); }
  };

  // Initialize reviews + ratings
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
    <div className="books-page">
      <h1>Our Books</h1>

      <div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={fetchMyBooks}>View My Library</button>
      </div>

      {myBooks.length > 0 && (
        <div>
          <h2>📚 My Purchased Books</h2>
          {myBooks.map((b, i) => (
            <div key={i}><a href={b.bookUrl} target="_blank" rel="noreferrer">📥 Download {b.bookId}</a></div>
          ))}
        </div>
      )}

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>⭐ {ratings[book.id]?.average} ({ratings[book.id]?.count} reviews)</p>
            <button disabled={loadingBook === book.id} onClick={() => handlePurchase(book.id)}>
              {loadingBook === book.id ? "Processing..." : "Buy Book"}
            </button>

            <div className="reviews-section">
              {(reviews[book.id] || []).map((r, idx) => (
                <div key={idx} className="review-card">
                  <strong>{maskEmail(r.email)}</strong> - ⭐ {r.rating}
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}