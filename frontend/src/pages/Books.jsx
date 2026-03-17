import { useState } from "react";
import "./books.css";

const API_URL = "https://gishmaf-website-1.onrender.com";

export default function Books() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

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
    let userEmail = email;

    // Prompt for email if not set
    if (!userEmail) {
      userEmail = prompt("Enter your email (receipt will be sent):");
      if (!userEmail) return alert("Email is required for receipt.");
      setEmail(userEmail);
      localStorage.setItem("email", userEmail);
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/books/create-book-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bookId, email: userEmail }),
      });

      const data = await res.json();

      if (data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else if (data.error) {
        alert(`Payment failed: ${data.error}`);
        console.error("Stripe session error:", data.error);
      } else {
        alert("Failed to start payment. Please try again.");
      }

    } catch (err) {
      console.error("Purchase error:", err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="books-page">
      <h1 className="books-title">Our Books</h1>

      {loading && <p className="loading-msg">Redirecting to payment...</p>}

      <div className="books-grid">
        {books.map((book) => (
          <div key={book.id} className="book-card">
            <img src={book.image} alt={book.title} />
            <div className="book-info">
              <h3>{book.title}</h3>
              <button
                className="buy-button"
                onClick={() => handleBookPurchase(book.id)}
                disabled={loading}
              >
                {loading ? "Processing..." : "Buy Book"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}