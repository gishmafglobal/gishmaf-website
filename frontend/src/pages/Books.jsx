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
//   const [reviewForm, setReviewForm] = useState({ rating: 5, comment: "" });

//   const books = [
//     { id: "book1", title: "Escape from the Street", image: "/images/book1.jpg" },
//     { id: "book2", title: "A Lonely Life Survivor", image: "/images/book2.jpg" },
//   ];

//   // ================= FETCH REVIEWS =================
//   const fetchReviews = async () => {
//     try {
//       const updatedRatings = {};
//       const updatedReviews = {};

//       for (const book of books) {
//         const res = await fetch(`${API_URL}/api/reviews/${book.id}`);
//         const data = await res.json();

//         updatedReviews[book.id] = data || [];

//         if (data.length > 0) {
//           const avg =
//             data.reduce((acc, r) => acc + r.rating, 0) / data.length;
//           updatedRatings[book.id] = {
//             average: avg.toFixed(1),
//             count: data.length,
//           };
//         } else {
//           updatedRatings[book.id] = { average: "0.0", count: 0 };
//         }
//       }

//       setRatings(updatedRatings);
//       setReviews(updatedReviews);
//     } catch (err) {
//       console.error("Error fetching reviews:", err);
//     }
//   };

//   useEffect(() => {
//     fetchReviews();
//   }, []);

//   // ================= MASK EMAIL =================
//   const maskEmail = (email) => {
//     if (!email) return "";
//     const [name, domain] = email.split("@");
//     return name.slice(0, 2) + "****@" + domain;
//   };

//   // ================= FETCH LIBRARY =================
//   const fetchMyBooks = async () => {
//     if (!email) return;

//     try {
//       const res = await fetch(
//         `${API_URL}/api/books/my-books?email=${email}`
//       );
//       const data = await res.json();
//       if (data.success) setMyBooks(data.books);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // ================= PURCHASE =================
//   const handleBookPurchase = async (bookId) => {
//     if (!email || !email.includes("@")) {
//       alert("Enter a valid email before purchasing.");
//       return;
//     }

//     localStorage.setItem("email", email);

//     try {
//       setLoadingBook(bookId);

//       const res = await fetch(
//         `${API_URL}/api/books/create-book-session`,
//         {
//           method: "POST",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ bookId, email }),
//         }
//       );

//       const data = await res.json();
//       if (data.url) window.location.href = data.url;
//       else alert("Payment failed");

//     } catch (err) {
//       alert("Purchase error");
//     } finally {
//       setLoadingBook(null);
//     }
//   };

//   // ================= SUBMIT REVIEW =================
//   const handleReviewSubmit = async (bookId) => {
//     if (!email || !email.includes("@")) {
//       alert("Enter your email to review.");
//       return;
//     }

//     if (!reviewForm.comment) {
//       alert("Write a comment.");
//       return;
//     }

//     try {
//       await fetch(`${API_URL}/api/reviews/${bookId}`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           email,
//           rating: reviewForm.rating,
//           comment: reviewForm.comment,
//         }),
//       });

//       setReviewForm({ rating: 5, comment: "" });
//       fetchReviews();

//     } catch (err) {
//       alert("Review failed");
//     }
//   };

//   return (
//     <section className="books-page">
//       <h1 className="books-title">Our Books</h1>

//       {/* EMAIL INPUT */}
//       <div className="email-section">
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <button onClick={fetchMyBooks}>View My Library</button>
//       </div>

//       {/* MY LIBRARY */}
//       {myBooks.length > 0 && (
//         <div className="my-library">
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
//                 className="buy-button"
//               >
//                 {loadingBook === book.id
//                   ? "Processing..."
//                   : "Buy Book"}
//               </button>

//               {/* REVIEWS */}
//               <div className="reviews-section">
//                 {(reviews[book.id] || []).map((r, index) => (
//                   <div key={index} className="review-card">
//                     <strong>{maskEmail(r.email)}</strong>

//                     {r.verified && (
//                       <span
//                         style={{
//                           color: "green",
//                           fontSize: "12px",
//                           marginLeft: "6px",
//                         }}
//                       >
//                         ✅ Verified Purchase
//                       </span>
//                     )}

//                     <div>⭐ {r.rating}</div>
//                     <p>{r.comment}</p>
//                   </div>
//                 ))}
//               </div>

//               {/* REVIEW FORM */}
//               <div className="review-form">
//                 <select
//                   value={reviewForm.rating}
//                   onChange={(e) =>
//                     setReviewForm({
//                       ...reviewForm,
//                       rating: Number(e.target.value),
//                     })
//                   }
//                 >
//                   {[5, 4, 3, 2, 1].map((n) => (
//                     <option key={n} value={n}>
//                       {n}⭐
//                     </option>
//                   ))}
//                 </select>

//                 <input
//                   type="text"
//                   placeholder="Write a review..."
//                   value={reviewForm.comment}
//                   onChange={(e) =>
//                     setReviewForm({
//                       ...reviewForm,
//                       comment: e.target.value,
//                     })
//                   }
//                 />

//                 <button
//                   onClick={() =>
//                     handleReviewSubmit(book.id)
//                   }
//                 >
//                   Submit
//                 </button>
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

const API_URL = process.env.REACT_APP_API_URL || "https://gishmaf-website-1.onrender.com";

const FAKE_REVIEWS = {
  book1: [
    { email: "alice@gmail.com", rating: 5, comment: "Absolutely loved this book! A must-read." },
    { email: "john@yahoo.com", rating: 5, comment: "Incredible story, really inspiring!" },
  ],
  book2: [
    { email: "mike@yandex.com", rating: 5, comment: "This book changed my perspective completely." },
    { email: "sarah@outlook.com", rating: 5, comment: "Amazing writing, very touching story." },
  ],
};

export default function Books() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [myBooks, setMyBooks] = useState([]);
  const [loadingBook, setLoadingBook] = useState(null);
  const [reviews, setReviews] = useState({});

  const books = [
    { id: "book1", title: "Escape from the Street", image: "/images/book1.jpg" },
    { id: "book2", title: "A Lonely Life Survivor", image: "/images/book2.jpg" },
  ];

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    const updatedReviews = {};
    for (const book of books) {
      try {
        const res = await fetch(`${API_URL}/api/reviews/${book.id}`);
        const realReviews = await res.json();
        updatedReviews[book.id] = [...(FAKE_REVIEWS[book.id] || []), ...(realReviews || [])];
      } catch (err) { console.error(err); }
    }
    setReviews(updatedReviews);
  };

  const getAverageRating = (bookId) => {
    const all = reviews[bookId] || [];
    if (!all.length) return 0;
    const avg = all.reduce((sum, r) => sum + r.rating, 0) / all.length;
    return avg.toFixed(1);
  };

  const maskEmail = (email) => {
    if (!email) return "";
    const [name, domain] = email.split("@");
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

  const handleBookPurchase = async (bookId) => {
    if (!email.includes("@")) return alert("Enter a valid email");
    localStorage.setItem("email", email);

    setLoadingBook(bookId);

    // For testing: bypass payment
    window.open(`${API_URL}/api/books/test-download/${bookId}`, "_blank");

    setLoadingBook(null);
  };

  return (
    <section className="books-page">
      <h1>Our Books</h1>

      <div className="email-section">
        <input placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <button onClick={fetchMyBooks}>View My Library</button>
      </div>

      {myBooks.length > 0 && (
        <div className="my-library">
          <h2>📚 My Purchased Books</h2>
          {myBooks.map((b, i) => (
            <div key={i}>
              <a href={b.bookUrl} target="_blank" rel="noreferrer">📥 Download {b.bookId}</a>
            </div>
          ))}
        </div>
      )}

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />
            <h3>{book.title}</h3>
            <p>⭐ {getAverageRating(book.id)} ({(reviews[book.id] || []).length} reviews)</p>
            <button onClick={() => handleBookPurchase(book.id)}>
              {loadingBook === book.id ? "Processing..." : "Buy / Test Download"}
            </button>

            <div className="reviews-section">
              {(reviews[book.id] || []).map((r, i) => (
                <div key={i} className="review-card">
                  <strong>{maskEmail(r.email)}</strong>
                  <div>⭐ {r.rating}</div>
                  <p>{r.comment}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}