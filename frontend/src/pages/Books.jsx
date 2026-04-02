import { useState } from "react";

const API_URL = "https://gishmaf-website-1.onrender.com";

export default function Books() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [loadingBook, setLoadingBook] = useState(null);

  const books = [
    { id: "book1", title: "Escape from the Street", image: "/images/book1.jpg" },
    { id: "book2", title: "A Lonely Life Survivor", image: "/images/book2.jpg" },
  ];

  // ✅ FIXED PURCHASE FUNCTION (NO STRIPE JS)
  const handlePurchase = async (bookId) => {
    console.log("🚀 Starting purchase:", bookId);

    if (!email || !email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    setLoadingBook(bookId);
    localStorage.setItem("email", email);

    try {
      const res = await fetch(`${API_URL}/api/books/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, bookId }),
      });

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("❌ Backend returned non-JSON:", text);
        alert("Server error. Check console.");
        return;
      }

      console.log("✅ Purchase response:", data);

      // ✅ THIS IS THE FIX
      if (data.url) {
        console.log("➡️ Redirecting to Stripe Checkout...");
        window.location.href = data.url;
      } else {
        alert("Payment failed: No checkout URL returned");
      }

    } catch (err) {
      console.error("🔥 Purchase error:", err);
      alert("Purchase failed. See console.");
    } finally {
      setLoadingBook(null);
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "Arial" }}>
      <h1>📚 Our Books</h1>

      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{
          padding: "10px",
          width: "300px",
          marginBottom: "30px",
        }}
      />

      <div style={{ display: "flex", gap: "20px" }}>
        {books.map((book) => (
          <div key={book.id} style={{ border: "1px solid #ccc", padding: "20px" }}>
            <img
              src={book.image}
              alt={book.title}
              style={{ width: "200px", height: "250px", objectFit: "cover" }}
            />
            <h3>{book.title}</h3>

            <button
              onClick={() => handlePurchase(book.id)}
              disabled={loadingBook === book.id}
              style={{
                padding: "10px",
                background: "black",
                color: "white",
                cursor: "pointer",
              }}
            >
              {loadingBook === book.id ? "Processing..." : "Buy Book"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}