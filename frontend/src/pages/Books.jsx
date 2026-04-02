import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

// ✅ API URL stays the same
const API_URL = process.env.REACT_APP_API_URL;

// ✅ FIX: use Vite env variable correctly
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const FAKE_REVIEWS = {
  book1: [
    { email: "alice@gmail.com", rating: 5, comment: "Absolutely loved this book!" },
    { email: "john@yahoo.com", rating: 5, comment: "Incredible story!" },
    { email: "sarah@yahoo.com", rating: 4, comment: "its a wow for me!" },
    { email: "usman@yandex.com", rating: 4, comment: "its too long man,but quite ok though" },
    { email: "steve@outlook.com", rating: 5, comment: "good one bro!" },
    { email: "ayomide@hotmail.com", rating: 5, comment: "This is deep!" },
  ],
  book2: [
    { email: "mike@yandex.com", rating: 5, comment: "Changed my perspective!" },
    { email: "sarah@outlook.com", rating: 5, comment: "Very touching story." },
    { email: "dola@yahoo.com", rating: 5, comment: "quite Incredible!" },
    { email: "djmanny@gmail.com", rating: 3, comment: "nice one !" },
    { email: "anny@doha.com", rating: 5, comment: "lovely!" },
    { email: "tatu@yandex.com", rating: 4, comment: "hmm!" },
    { email: "youjin@qq.com", rating: 5, comment: "this is really recommendable!" },
    { email: "joy@gmail.com", rating: 5, comment: "really nice and a good book!" },
  ],
};

export default function Books() {
  const [email, setEmail] = useState(localStorage.getItem("email") || "");
  const [loadingBook, setLoadingBook] = useState(null);
  const [reviews, setReviews] = useState({});
  const [ratings, setRatings] = useState({});

  const books = [
    { id: "book1", title: "Escape from the Street", image: "/images/book1.jpg" },
    { id: "book2", title: "A Lonely Life Survivor", image: "/images/book2.jpg" },
  ];

  const maskEmail = (e) => {
    if (!e) return "";
    const [name, domain] = e.split("@");
    return name.slice(0, 2) + "****@" + domain;
  };

  const handlePurchase = async (bookId) => {
    if (!email.includes("@")) { alert("Enter a valid email"); return; }
    localStorage.setItem("email", email);
    setLoadingBook(bookId);

    try {
      console.log("[HANDLE PURCHASE] Starting purchase for book:", bookId);

      const res = await fetch(`${API_URL}/api/books/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, bookId }),
      });

      console.log("[HANDLE PURCHASE] Response status:", res.status);
      const text = await res.text();
      console.log("[HANDLE PURCHASE] Raw response text:", text);

      let data = {};
      try { data = JSON.parse(text); } 
      catch (err) { console.error("[HANDLE PURCHASE] JSON parse error:", err); }

      console.log("[HANDLE PURCHASE] Backend response:", data);

      if (data.sessionId) {
        const stripe = await stripePromise;
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        alert(`Purchase failed: checkout session not created. Backend message: ${data.error || "no error info"}`);
      }
    } catch (err) {
      console.error("[HANDLE PURCHASE ERROR]", err);
      alert("Purchase failed: see console for details");
    } finally {
      setLoadingBook(null);
    }
  };

  useEffect(() => {
    const r = {};
    const avg = {};
    for (const b of books) {
      r[b.id] = FAKE_REVIEWS[b.id] || [];
      const reviewsList = r[b.id];
      avg[b.id] = reviewsList.length > 0
        ? { average: (reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length).toFixed(1), count: reviewsList.length }
        : { average: "0.0", count: 0 };
    }
    setReviews(r);
    setRatings(avg);
  }, []);

  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh", padding: "60px 20px", fontFamily: "Segoe UI, sans-serif", color: "#111" }}>
      <h1 style={{ textAlign: "center", fontSize: "42px", fontWeight: "700", marginBottom: "50px", color: "#111" }}>📚 Our Books</h1>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", maxWidth: "1200px", margin: "0 auto" }}>
        {books.map((book) => (
          <div key={book.id} style={{ background: "#ffffff", borderRadius: "20px", padding: "25px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)", transition: "0.3s ease" }}>
            <img src={book.image} alt={book.title} style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "15px", marginBottom: "20px" }} />
            <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "10px", color: "#111" }}>{book.title}</h2>
            <div style={{ fontSize: "16px", fontWeight: "600", color: "#f59e0b", marginBottom: "15px" }}>⭐ {ratings[book.id]?.average} ({ratings[book.id]?.count} reviews)</div>
            <button disabled={loadingBook === book.id} onClick={() => handlePurchase(book.id)} style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "none", backgroundColor: "#111", color: "#fff", fontSize: "15px", fontWeight: "600", cursor: "pointer", marginBottom: "25px" }}>
              {loadingBook === book.id ? "Processing..." : "Buy Book"}
            </button>

            <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px", color: "#111" }}>Reviews</h4>
            {(reviews[book.id] || []).map((r, index) => (
              <div key={index} style={{ backgroundColor: "#f9fafb", padding: "15px", borderRadius: "12px", marginBottom: "12px", border: "1px solid #e5e7eb" }}>
                <div style={{ fontWeight: "600", fontSize: "14px", marginBottom: "5px", color: "#111" }}>{maskEmail(r.email)}</div>
                <div style={{ color: "#f59e0b", fontWeight: "600", marginBottom: "6px" }}>⭐ {r.rating}</div>
                <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.6", margin: 0 }}>{r.comment}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}