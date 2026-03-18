import { useState } from "react";
import "./books.css";

const API_URL = process.env.REACT_APP_API_URL || "https://gishmaf-website-1.onrender.com";

export default function Books() {
  const [loadingBook, setLoadingBook] = useState(null); // store bookId being processed

  const books = [
    { id: "book1", title: "Escape from the Street", image: "/images/book1.jpg" },
    { id: "book2", title: "A Lonely Life Survivor", image: "/images/book2.jpg" },
  ];

  const handleBookPurchase = async (bookId) => {
    let email = localStorage.getItem("email");
    if (!email) {
      email = prompt("Enter your email (receipt will be sent):");
      if (!email) return;
      localStorage.setItem("email", email);
    }

    try {
      setLoadingBook(bookId); // mark this book as loading

      const res = await fetch(`${API_URL}/api/books/create-book-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, email }),
      });

      const data = await res.json();

      if (data.url) {
        // ✅ redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        alert("Failed to start payment. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoadingBook(null); // reset loading state
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
                disabled={loadingBook !== null} // disable other buttons while processing
              >
                {loadingBook === book.id ? "Redirecting..." : "Buy Book"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}