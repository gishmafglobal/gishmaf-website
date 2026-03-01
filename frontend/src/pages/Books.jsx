// import BookShelf from "../components/BookShelf";

// export default function Book() {
//   return (
//     <div>
//       <h1 style={{ textAlign: "center", marginTop: "20px" }}>
//         Online Library
//       </h1>
//       <BookShelf />
//     </div>
//   );
// }



import { useState } from "react";
import "./books.css";

const API_URL = import.meta.env.VITE_API_URL;

export default function Books() {
  // Book catalog with unique IDs
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

  // Handle Stripe checkout for a specific book
  const handleBookPurchase = async (bookId) => {
    try {
      const res = await fetch(`${API_URL}/api/books/create-book-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId }),
      });

      const data = await res.json();

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        alert("Failed to initiate purchase. Try again.");
      }
    } catch (err) {
      console.error("Error creating Stripe session:", err);
      alert("Something went wrong. Try again later.");
    }
  };

  return (
    <section className="books-page">
      <h1 className="books-title">Our Books</h1>

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