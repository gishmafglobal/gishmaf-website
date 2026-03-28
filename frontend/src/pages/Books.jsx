// import { useState, useEffect } from "react";
// import "./books.css";

// const API_URL =
//   process.env.REACT_APP_API_URL ||
//   "https://gishmaf-website-1.onrender.com";

// export default function Books() {
//   const [loadingBook, setLoadingBook] = useState(null);
//   const [ratings, setRatings] = useState({});

//   const books = [
//     { id: "book1", title: "Escape from the Street", image: "/images/book1.jpg" },
//     { id: "book2", title: "A Lonely Life Survivor", image: "/images/book2.jpg" },
//   ];

//   // ===============================
//   // FETCH RATINGS FOR EACH BOOK
//   // ===============================
//   useEffect(() => {
//     const fetchRatings = async () => {
//       try {
//         const updatedRatings = {};

//         for (const book of books) {
//           const res = await fetch(`${API_URL}/api/reviews/${book.id}`);
//           const reviews = await res.json();

//           if (reviews.length > 0) {
//             const avg =
//               reviews.reduce((acc, r) => acc + r.rating, 0) /
//               reviews.length;

//             updatedRatings[book.id] = {
//               average: avg.toFixed(1),
//               count: reviews.length,
//             };
//           } else {
//             updatedRatings[book.id] = {
//               average: "0.0",
//               count: 0,
//             };
//           }
//         }

//         setRatings(updatedRatings);
//       } catch (err) {
//         console.error(err);
//       }
//     };

//     fetchRatings();
//   }, []);

//   // ===============================
//   // HANDLE PURCHASE
//   // ===============================
//   const handleBookPurchase = async (bookId) => {
//     let email = localStorage.getItem("email");

//     if (!email) {
//       email = prompt("Enter your email:");
//       if (!email) return;
//       localStorage.setItem("email", email);
//     }

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

//       <div className="books-grid">
//         {books.map((book) => (
//           <div key={book.id} className="book-card">
//             <img src={book.image} alt={book.title} />

//             <div className="book-info">
//               <h3>{book.title}</h3>

//               {/* ⭐ DISPLAY RATING */}
//               <p>
//                 ⭐ {ratings[book.id]?.average || "0.0"} (
//                 {ratings[book.id]?.count || 0} reviews)
//               </p>

//               <button
//                 className="buy-button"
//                 onClick={() => handleBookPurchase(book.id)}
//                 disabled={loadingBook === book.id}
//               >
//                 {loadingBook === book.id ? "Processing..." : "Buy Book"}
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import { useState, useEffect } from "react";
import "./books.css";

const API_URL =
  process.env.REACT_APP_API_URL ||
  "https://gishmaf-website-1.onrender.com";

export default function Books() {
  const [loadingBook, setLoadingBook] = useState(null);
  const [ratings, setRatings] = useState({});
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  const books = [
    { id: "book1", title: "Escape from the Street", image: "/images/book1.jpg" },
    { id: "book2", title: "A Lonely Life Survivor", image: "/images/book2.jpg" },
  ];

  // ===============================
  // FETCH RATINGS
  // ===============================
  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const updatedRatings = {};

        for (const book of books) {
          const res = await fetch(`${API_URL}/api/reviews/${book.id}`);
          const reviews = await res.json();

          if (reviews.length > 0) {
            const avg =
              reviews.reduce((acc, r) => acc + r.rating, 0) /
              reviews.length;

            updatedRatings[book.id] = {
              average: avg.toFixed(1),
              count: reviews.length,
            };
          } else {
            updatedRatings[book.id] = {
              average: "0.0",
              count: 0,
            };
          }
        }

        setRatings(updatedRatings);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRatings();
  }, []);

  // ===============================
  // HANDLE PURCHASE
  // ===============================
  const handleBookPurchase = async (bookId) => {
    if (!email || !email.includes("@")) {
      alert("Please enter a valid email before purchasing.");
      return;
    }

    // ✅ SAVE EMAIL BEFORE PAYMENT
    localStorage.setItem("email", email);

    try {
      setLoadingBook(bookId);

      const res = await fetch(`${API_URL}/api/books/create-book-session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
          email,
        }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Payment failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoadingBook(null);
    }
  };

  return (
    <section className="books-page">
      <h1 className="books-title">Our Books</h1>

      {/* ✅ EMAIL INPUT (NEW) */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <input
          type="email"
          placeholder="Enter your email before purchase"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            padding: "12px",
            width: "280px",
            borderRadius: "6px",
            border: "1px solid #ccc",
            marginRight: "10px",
          }}
        />
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />

            <div className="book-info">
              <h3>{book.title}</h3>

              {/* ⭐ RATINGS */}
              <p>
                ⭐ {ratings[book.id]?.average || "0.0"} (
                {ratings[book.id]?.count || 0} reviews)
              </p>

              {/* 🔥 BIGGER BUTTON */}
              <button
                onClick={() => handleBookPurchase(book.id)}
                disabled={loadingBook === book.id}
                style={{
                  padding: "14px 28px",
                  fontSize: "16px",
                  backgroundColor: "#f5b942",
                  border: "none",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  marginTop: "10px",
                }}
              >
                {loadingBook === book.id ? "Processing..." : "Buy Book"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}