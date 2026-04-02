// import { useState, useEffect } from "react";
// import "./books.css";

// const API_URL =
//   process.env.REACT_APP_API_URL ||
//   "https://gishmaf-website-1.onrender.com";

// export default function Books() {
//   const [loadingBook, setLoadingBook] = useState(null);
//   const [ratings, setRatings] = useState({});
//   const [reviews, setReviews] = useState({});
//   const [email, setEmail] = useState(localStorage.getItem("email") || "");
//   const [myBooks, setMyBooks] = useState([]);

//   const books = [
//     { id: "book1", title: "Escape from the Street", image: "/images/book1.jpg" },
//     { id: "book2", title: "A Lonely Life Survivor", image: "/images/book2.jpg" },
//   ];

//   // ===============================
//   // FETCH RATINGS + REVIEWS
//   // ===============================
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const updatedRatings = {};
//         const updatedReviews = {};

//         for (const book of books) {
//           const res = await fetch(`${API_URL}/api/reviews/${book.id}`);
//           const bookReviews = await res.json();

//           updatedReviews[book.id] = bookReviews;

//           if (bookReviews.length > 0) {
//             const avg =
//               bookReviews.reduce((acc, r) => acc + r.rating, 0) /
//               bookReviews.length;

//             updatedRatings[book.id] = {
//               average: avg.toFixed(1),
//               count: bookReviews.length,
//             };
//           } else {
//             updatedRatings[book.id] = {
//               average: "0.0",
//               count: 0,
//             };
//           }
//         }

//         setRatings(updatedRatings);
//         setReviews(updatedReviews);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchData();
//   }, []);

//   // ===============================
//   // MASK EMAIL FUNCTION
//   // ===============================
//   const maskEmail = (email) => {
//     if (!email) return "";
//     const [name, domain] = email.split("@");
//     return name.slice(0, 2) + "****@" + domain;
//   };

//   // ===============================
//   // FETCH PURCHASED BOOKS
//   // ===============================
//   const fetchMyBooks = async () => {
//     if (!email) return;



import { useState, useEffect } from "react";
import "./books.css";

const API_URL =
  import.meta.env.VITE_API_URL ||
  "https://gishmaf-website-1.onrender.com";

// ---------------- FAKE REVIEWS ----------------
const FAKE_REVIEWS = {
  book1: [
    { email: "alice@gmail.com", rating: 5, comment: "Absolutely loved this book!" },
  ],
  book2: [
    { email: "mike@yandex.com", rating: 5, comment: "Changed my perspective!" },
  ],
};

export default function Books() {
  const [loadingBook, setLoadingBook] = useState(null);
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const books = [
    { id: "book1", title: "Escape from the Street", image: "/images/book1.jpg" },
    { id: "book2", title: "A Lonely Life Survivor", image: "/images/book2.jpg" },
  ];

  // ---------------- FETCH REVIEWS (FIXED) ----------------
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

        const data = await res.json();

        const combined = [...(FAKE_REVIEWS[book.id] || []), ...(data || [])];

        updatedReviews[book.id] = combined;

        const avg =
          combined.reduce((acc, r) => acc + r.rating, 0) / combined.length;

        updatedRatings[book.id] = {
          average: avg.toFixed(1),
          count: combined.length,
        };
      }

      setReviews(updatedReviews);
      setRatings(updatedRatings);
    } catch (err) {
      console.error("🔥 Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // ---------------- PURCHASE (WORKING) ----------------
  const handlePurchase = async (bookId) => {
    if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    localStorage.setItem("email", email);
    setLoadingBook(bookId);

    try {
      console.log("🚀 Starting purchase:", bookId);

      const res = await fetch(`${API_URL}/api/books/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, bookId }),
      });

      const data = await res.json();
      console.log("✅ Purchase response:", data);

      if (data.url) {
        window.location.href = data.url; // NEW Stripe redirect
      } else {
        alert(data.error || "Payment failed");
      }
    } catch (err) {
      console.error("🔥 Purchase error:", err);
      alert("Purchase failed");
    } finally {
      setLoadingBook(null);
    }
  };

  // ---------------- MASK EMAIL ----------------
  const maskEmail = (e) => {
    const [name, domain] = e.split("@");
    return name.slice(0, 2) + "****@" + domain;
  };

  return (
    <div className="books-page">
      <h1>📚 Our Books</h1>

      {/* EMAIL */}
      <input
        type="email"
        placeholder="Enter email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      {/* BOOKS */}
      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>

            <p>
              ⭐ {ratings[book.id]?.average || "0.0"} (
              {ratings[book.id]?.count || 0})
            </p>

            <button onClick={() => handlePurchase(book.id)}>
              {loadingBook === book.id ? "Processing..." : "Buy Book"}
            </button>

            {/* REVIEWS */}
            {(reviews[book.id] || []).map((r, i) => (
              <div key={i}>
                <b>{maskEmail(r.email)}</b>
                <div>⭐ {r.rating}</div>
                <p>{r.comment}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}