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



// ...keep all previous imports and state

export default function Books() {
  // ...all previous states and functions

  // Render stars helper
  const renderStars = (num) => {
    const fullStars = Math.floor(num);
    const halfStar = num - fullStars >= 0.5;
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) stars.push(<span key={i} className="star filled">★</span>);
      else if (i === fullStars + 1 && halfStar) stars.push(<span key={i} className="star half">★</span>);
      else stars.push(<span key={i} className="star">★</span>);
    }
    return stars;
  };

  return (
    <section className="books-page">
      <h1 className="books-title">Our Books</h1>
      {/* email section ... */}

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />
            <div className="book-info">
              <h3>{book.title}</h3>

              {/* ===================== */}
              {/* Average Rating Bar */}
              {/* ===================== */}
              <div className="average-rating">
                <div className="stars">{renderStars(ratings[book.id]?.average || 0)}</div>
                <span className="rating-text">
                  {ratings[book.id]?.average || "0.0"} / 5 ({ratings[book.id]?.count || 0} reviews)
                </span>
              </div>

              <button
                onClick={() => handleBookPurchase(book.id)}
                disabled={loadingBook === book.id}
              >
                {loadingBook === book.id ? "Processing..." : "Buy Book"}
              </button>

              {/* Reviews section */}
              {/* ...keep review display and review form unchanged */}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}