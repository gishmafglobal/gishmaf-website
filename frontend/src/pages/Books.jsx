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

//     const res = await fetch(`${API_URL}/api/books/my-books?email=${email}`);
//     const data = await res.json();

//     if (data.success) {
//       setMyBooks(data.books);
//     }
//   };

//   // ===============================
//   // HANDLE PURCHASE
//   // ===============================
//   const handleBookPurchase = async (bookId) => {
//     if (!email || !email.includes("@")) {
//       alert("Please enter a valid email before purchasing.");
//       return;
//     }

//     localStorage.setItem("email", email);

//     try {
//       setLoadingBook(bookId);

//       const res = await fetch(`${API_URL}/api/books/create-book-session`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ bookId, email }),
//       });

//       const data = await res.json();

//       if (data.url) {
//         window.location.href = data.url;
//       } else {
//         alert(data.error || "Payment failed");
//       }
//     } catch (err) {
//       alert("Something went wrong.");
//     } finally {
//       setLoadingBook(null);
//     }
//   };

//   return (
//     <section className="books-page">
//       <h1 className="books-title">Our Books</h1>

//       <div style={{ textAlign: "center", marginBottom: "30px" }}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{
//             padding: "12px",
//             width: "280px",
//             borderRadius: "6px",
//             border: "1px solid #ccc",
//             marginRight: "10px",
//           }}
//         />

//         <button
//           onClick={fetchMyBooks}
//           style={{
//             padding: "10px 20px",
//             borderRadius: "6px",
//             cursor: "pointer",
//           }}
//         >
//           View My Library
//         </button>
//       </div>

//       {/* =============================== */}
//       {/* MY LIBRARY */}
//       {/* =============================== */}
//       {myBooks.length > 0 && (
//         <div style={{ marginBottom: "40px" }}>
//           <h2>📚 My Purchased Books</h2>

//           {myBooks.map((b, index) => (
//             <div key={index}>
//               <a href={b.bookUrl} target="_blank" rel="noreferrer">
//                 📥 Download {b.bookId}
//               </a>
//             </div>
//           ))}
//         </div>
//       )}

//       <div className="books-grid">
//         {books.map((book) => (
//           <div key={book.id} className="book-card">
//             <img src={book.image} alt={book.title} />

//             <div className="book-info">
//               <h3>{book.title}</h3>

//               <p>
//                 ⭐ {ratings[book.id]?.average || "0.0"} (
//                 {ratings[book.id]?.count || 0} reviews)
//               </p>

//               <button
//                 onClick={() => handleBookPurchase(book.id)}
//                 disabled={loadingBook === book.id}
//                 style={{
//                   padding: "14px 28px",
//                   fontSize: "16px",
//                   backgroundColor: "#f5b942",
//                   border: "none",
//                   borderRadius: "8px",
//                   cursor: "pointer",
//                   fontWeight: "bold",
//                   marginTop: "10px",
//                 }}
//               >
//                 {loadingBook === book.id ? "Processing..." : "Buy Book"}
//               </button>

//               {/* REVIEWS */}
//               <div style={{ marginTop: "20px", textAlign: "left" }}>
//                 {reviews[book.id]?.slice(0, 3).map((r, index) => (
//                   <div
//                     key={index}
//                     style={{
//                       borderTop: "1px solid #eee",
//                       paddingTop: "8px",
//                       marginTop: "8px",
//                       fontSize: "14px",
//                     }}
//                   >
//                     <strong>{maskEmail(r.email)}</strong>
//                     <div>⭐ {r.rating}</div>
//                     <p>{r.comment}</p>
//                   </div>
//                 ))}
//               </div>

//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }



import { useState, useEffect } from "react";
import "./books.css";
import book1Img from "../assets/images/book1.jpg";
import book2Img from "../assets/images/book2.jpg";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://gishmaf-website-1.onrender.com";

// Pre-populated fake reviews for trust
const FAKE_REVIEWS = {
  book1: [
    { email: "alice@yandex.com", rating: 5, comment: "Absolutely loved this book! A must-read." },
    { email: "john@gmail.com", rating: 5, comment: "Incredible story, really inspiring!" },
    { email: "emma@yahoo.com", rating: 5, comment: "Couldn't put it down. Highly recommended." },
  ],
  book2: [
    { email: "mike@outlook.com", rating: 5, comment: "This book changed my perspective completely." },
    { email: "sarah@londa.com", rating: 5, comment: "Amazing writing, very touching story." },
    { email: "lucas@co.uk", rating: 5, comment: "Five stars! I feel connected to the journey." },
  ],
};

export default function Books() {
  const [loadingBook, setLoadingBook] = useState(null);
  const [ratings, setRatings] = useState({});
  const [reviews, setReviews] = useState({});
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [myBooks, setMyBooks] = useState([]);
  const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });

  const books = [
    { id: "book1", title: "Escape from the Street", image: book1Img },
    { id: "book2", title: "A Lonely Life Survivor", image: book2Img },
  ];

  // -------------------- Fetch Reviews --------------------
  const fetchReviews = async () => {
    try {
      const updatedRatings = {};
      const updatedReviews = {};

      for (const book of books) {
        const res = await fetch(`${API_URL}/api/reviews/${book.id}`);
        const realReviews = await res.json();

        // Merge fake + real reviews
        const combinedReviews = [...(FAKE_REVIEWS[book.id] || []), ...(realReviews || [])];

        updatedReviews[book.id] = combinedReviews;

        if (combinedReviews.length > 0) {
          const avg =
            combinedReviews.reduce((acc, r) => acc + r.rating, 0) / combinedReviews.length;
          updatedRatings[book.id] = {
            average: avg.toFixed(1),
            count: combinedReviews.length,
          };
        } else {
          updatedRatings[book.id] = { average: "0.0", count: 0 };
        }
      }

      setRatings(updatedRatings);
      setReviews(updatedReviews);
    } catch (err) {
      console.error("Error fetching reviews:", err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  // -------------------- Mask Email --------------------
  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
    return name.slice(0, 2) + "****@" + domain;
  };

  // -------------------- Fetch Purchased Books --------------------
  const fetchMyBooks = async () => {
    if (!email) return;
    try {
      const res = await fetch(`${API_URL}/api/books/my-books?email=${email}`);
      const data = await res.json();
      if (data.success) setMyBooks(data.books);
    } catch (err) {
      console.error("Error fetching my books:", err);
    }
  };

  // -------------------- Purchase Book --------------------
  const handleBookPurchase = async (bookId) => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email before purchasing.");
      return;
    }

    localStorage.setItem("email", email);

    try {
      setLoadingBook(bookId);
      const res = await fetch(`${API_URL}/api/books/create-book-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, email }),
      });

      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else alert(data.error || "Payment failed");
    } catch (err) {
      console.error(err);
      alert("Something went wrong during purchase.");
    } finally {
      setLoadingBook(null);
    }
  };

  // -------------------- Submit Review --------------------
  const handleReviewSubmit = async (bookId) => {
    if (!email || !email.includes("@")) {
      alert("Please enter your valid email to submit a review.");
      return;
    }
    if (!reviewForm.comment) {
      alert("Please enter a comment.");
      return;
    }

    try {
      await fetch(`${API_URL}/api/reviews/${bookId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          rating: reviewForm.rating,
          comment: reviewForm.comment,
        }),
      });

      setReviewForm({ rating: 5, comment: "" });
      fetchReviews();
    } catch (err) {
      console.error(err);
      alert("Failed to submit review.");
    }
  };

  return (
    <section className="books-page">
      <h1 className="books-title">Our Books</h1>

      <div className="email-section">
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button onClick={fetchMyBooks}>View My Library</button>
      </div>

      {myBooks.length > 0 && (
        <div className="my-library">
          <h2>📚 My Purchased Books</h2>
          {myBooks.map((b, index) => (
            <div key={index}>
              <a href={b.bookUrl} target="_blank" rel="noreferrer">
                📥 Download {b.bookId}
              </a>
            </div>
          ))}
        </div>
      )}

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />
            <div className="book-info">
              <h3>{book.title}</h3>
              <p>
                ⭐ {ratings[book.id]?.average || "0.0"} (
                {ratings[book.id]?.count || 0} reviews)
              </p>
              <button
                onClick={() => handleBookPurchase(book.id)}
                disabled={loadingBook === book.id}
                className="buy-button"
              >
                {loadingBook === book.id ? "Processing..." : "Buy Book"}
              </button>

              {/* REVIEWS */}
              <div className="reviews-section">
                {(reviews[book.id] || []).slice(0, 5).map((r, index) => (
                  <div key={index} className="review-card">
                    <strong>{maskEmail(r.email)}</strong>
                    <div>⭐ {r.rating}</div>
                    <p>{r.comment}</p>
                  </div>
                ))}
              </div>

              {/* REVIEW FORM */}
              <div className="review-form">
                <select
                  value={reviewForm.rating}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, rating: Number(e.target.value) })
                  }
                >
                  {[5, 4, 3, 2, 1].map((n) => (
                    <option key={n} value={n}>
                      {n}⭐
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Write a review..."
                  value={reviewForm.comment}
                  onChange={(e) =>
                    setReviewForm({ ...reviewForm, comment: e.target.value })
                  }
                />
                <button onClick={() => handleReviewSubmit(book.id)}>Submit</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}