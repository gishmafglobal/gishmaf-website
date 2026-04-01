import { useState, useEffect } from "react";

const API_URL = "https://gishmaf-website-1.onrender.com";

// Pre-populated fake reviews
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
  const [myBooks, setMyBooks] = useState([]);
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

  const fetchMyBooks = async () => {
    if (!email) return;
    try {
      const res = await fetch(`${API_URL}/api/books/my-books?email=${email}`);
      const data = await res.json();
      if (data.success) setMyBooks(data.books);
    } catch (err) { console.error(err); }
  };

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
    } catch (err) { alert("Purchase failed"); }
    finally { setLoadingBook(null); }
  };

  useEffect(() => {
    const r = {};
    const avg = {};
    for (const b of books) {
      r[b.id] = FAKE_REVIEWS[b.id] || [];
      const reviewsList = r[b.id];
      avg[b.id] = reviewsList.length > 0
        ? {
            average: (
              reviewsList.reduce((acc, r) => acc + r.rating, 0) /
              reviewsList.length
            ).toFixed(1),
            count: reviewsList.length,
          }
        : { average: "0.0", count: 0 };
    }
    setReviews(r);
    setRatings(avg);
  }, []);

  return (
    <div style={{
      padding: "50px 20px",
      maxWidth: "1200px",
      margin: "auto",
      fontFamily: "Arial, sans-serif"
    }}>
      <h1 style={{
        textAlign: "center",
        marginBottom: 40,
        fontSize: "36px"
      }}>
        📚 Our Books
      </h1>

      <div style={{
        display: "flex",
        gap: 10,
        justifyContent: "center",
        marginBottom: 40,
        flexWrap: "wrap"
      }}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: 12,
            width: 280,
            borderRadius: 8,
            border: "1px solid #ddd"
          }}
        />
        <button
          onClick={fetchMyBooks}
          style={{
            padding: "12px 20px",
            borderRadius: 8,
            border: "none",
            background: "#232F3E",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          View My Library
        </button>
      </div>

      {myBooks.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <h2>📥 My Purchased Books</h2>
          {myBooks.map((b, i) => (
            <div key={i} style={{ marginBottom: 8 }}>
              <a href={b.bookUrl} target="_blank" rel="noreferrer">
                Download {b.bookId}
              </a>
            </div>
          ))}
        </div>
      )}

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        gap: 30
      }}>
        {books.map((book) => (
          <div key={book.id} style={{
            background: "#fff",
            borderRadius: 16,
            padding: 20,
            boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
            transition: "0.3s"
          }}>
            <img
              src={book.image}
              alt={book.title}
              style={{
                width: "100%",
                height: 300,
                objectFit: "cover",
                borderRadius: 12,
                marginBottom: 15
              }}
            />

            <h3 style={{ marginBottom: 8 }}>{book.title}</h3>

            <p style={{ color: "#FFA41C", fontWeight: "bold" }}>
              ⭐ {ratings[book.id]?.average} ({ratings[book.id]?.count} reviews)
            </p>

            <button
              disabled={loadingBook === book.id}
              onClick={() => handlePurchase(book.id)}
              style={{
                marginTop: 10,
                padding: "12px",
                width: "100%",
                borderRadius: 8,
                border: "none",
                background: "#FFA41C",
                fontWeight: "bold",
                cursor: "pointer"
              }}
            >
              {loadingBook === book.id ? "Processing..." : "Buy Book"}
            </button>

            <div style={{ marginTop: 20 }}>
              {(reviews[book.id] || []).map((r, idx) => (
                <div key={idx} style={{
                  marginBottom: 12,
                  padding: 12,
                  background: "#f8f8f8",
                  borderRadius: 8
                }}>
                  <strong>{maskEmail(r.email)}</strong>
                  <div style={{ color: "#FFA41C" }}>⭐ {r.rating}</div>
                  <p style={{ margin: 0 }}>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}