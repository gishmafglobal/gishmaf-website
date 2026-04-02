import React, { useState } from "react";
import axios from "axios";

const BOOKS = [
  { id: "book1", title: "Escape from the Street", price: 400 },
  { id: "book2", title: "A Lonely Life Survivor", price: 420 },
];

const Books = () => {
  const [loadingBookId, setLoadingBookId] = useState(null);

  const handlePurchase = async (bookId) => {
    try {
      setLoadingBookId(bookId);

      // Replace with the email of the user (or get from auth)
      const email = prompt("Enter your email for purchase:");

      if (!email) {
        alert("Email is required to purchase.");
        setLoadingBookId(null);
        return;
      }

      console.log("🚀 Starting purchase:", bookId);

      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/books/purchase`,
        { email, bookId }
      );

      if (!res.data.url) {
        throw new Error("No checkout URL returned");
      }

      console.log("✅ Purchase response:", res.data);

      // Redirect to Stripe checkout
      window.location.href = res.data.url;

    } catch (err) {
      console.error("🔥 Purchase error:", err);
      alert("Purchase failed: " + (err.response?.data?.error || err.message));
    } finally {
      setLoadingBookId(null);
    }
  };

  return (
    <div>
      <h1>Available Books</h1>
      <ul>
        {BOOKS.map((book) => (
          <li key={book.id} style={{ marginBottom: "20px" }}>
            <h2>{book.title}</h2>
            <p>Price: ${book.price / 100}</p>
            <button
              onClick={() => handlePurchase(book.id)}
              disabled={loadingBookId === book.id}
            >
              {loadingBookId === book.id ? "Processing..." : "Buy Now"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;