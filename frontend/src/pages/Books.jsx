

// import { useState } from "react";
// import "./books.css";

// const API_URL = "https://gishmaf-website-1.onrender.com"; // Your deployed backend

// export default function Books() {
//   const books = [
//     {
//       id: "book1",
//       title: "Escape from the Street",
//       image: "/images/book1.jpg",
//     },
//     {
//       id: "book2",
//       title: "A Lonely Life Survivor",
//       image: "/images/book2.jpg",
//     },
//   ];

//   // Stripe checkout for book
//   const handleBookPurchase = async (bookId) => {
//     try {
//       const res = await fetch(`${API_URL}/api/books/create-book-session`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ bookId }),
//       });

//       const data = await res.json();

//       if (data.url) {
//         // Redirect to Stripe checkout
//         window.location.href = data.url;
//       } else {
//         alert("Failed to create checkout session. Try again.");
//       }
//     } catch (err) {
//       console.error("Error creating book session:", err);
//       alert("Something went wrong. Try again later.");
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
//               <button
//                 className="buy-button"
//                 onClick={() => handleBookPurchase(book.id)}
//               >
//                 Buy / Read Book
//               </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </section>
//   );
// }

import { useState } from "react";
import "./books.css";

const API_URL = "https://gishmaf-website-1.onrender.com";

export default function Books() {
  const [loading, setLoading] = useState(false);

  const books = [
    {
      id: "book1",
      title: "Escape from the Street",
      image: "/images/book1.jpg",
    },
    {
      id: "book2",
      title: "A Lonely Life Survivor",
      image: "/images/book2.jpg",
    },
  ];

  const handleBookPurchase = async (bookId) => {
    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/books/create-book-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session.");
        setLoading(false);
      }
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong.");
      setLoading(false);
    }
  };

  return (
    <section className="books-page">
      <h1 className="books-title">Our Books</h1>

      {loading && <p>Redirecting to payment...</p>}

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />
            <div className="book-info">
              <h3>{book.title}</h3>
              <button
                className="buy-button"
                onClick={() => handleBookPurchase(book.id)}
              >
                Buy / Read Book
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}