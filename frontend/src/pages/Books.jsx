import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const API_URL = import.meta.env.VITE_API_URL;
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
    if (!email.includes("@")) {
      alert("Enter a valid email");
      return;
    }

    console.log("👉 API_URL:", API_URL);

    localStorage.setItem("email", email);
    setLoadingBook(bookId);

    try {
      const res = await fetch(`${API_URL}/api/books/purchase`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, bookId }),
      });

      console.log("STATUS:", res.status);

      const text = await res.text();
      console.log("RAW RESPONSE:", text);

      if (!res.ok) {
        alert(`Server error (${res.status}): ${text}`);
        return;
      }

      let data;
      try {
        data = JSON.parse(text);
      } catch (err) {
        console.error("❌ Backend returned NON-JSON:", text);
        alert("Server error: invalid response from backend");
        return;
      }

      if (!data || !data.sessionId) {
        alert(`Purchase failed: ${data?.error || "No session returned"}`);
        return;
      }

      const stripe = await stripePromise;
      await stripe.redirectToCheckout({ sessionId: data.sessionId });

    } catch (err) {
      console.error("❌ PURCHASE ERROR:", err);
      alert("Purchase failed. Check console.");
    } finally {
      setLoadingBook(null);
    }
  };

  useEffect(() => {
    const r = {};
    const avg = {};

    for (const b of books) {
      r[b.id] = FAKE_REVIEWS[b.id] || [];
      const list = r[b.id];

      avg[b.id] = list.length
        ? {
            average: (
              list.reduce((acc, r) => acc + r.rating, 0) / list.length
            ).toFixed(1),
            count: list.length,
          }
        : { average: "0.0", count: 0 };
    }

    setReviews(r);
    setRatings(avg);
  }, []);

  return (
    <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh", padding: "60px 20px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>📚 Our Books</h1>

      <div style={{ display: "grid", gap: "30px", maxWidth: "1000px", margin: "0 auto" }}>
        {books.map((book) => (
          <div key={book.id} style={{ background: "#fff", padding: "20px", borderRadius: "12px" }}>
            <img src={book.image} alt={book.title} style={{ width: "100%", height: "250px", objectFit: "cover" }} />
            <h2>{book.title}</h2>

            <div>⭐ {ratings[book.id]?.average} ({ratings[book.id]?.count})</div>

            <button
              disabled={loadingBook === book.id}
              onClick={() => handlePurchase(book.id)}
            >
              {loadingBook === book.id ? "Processing..." : "Buy Book"}
            </button>

            <h4>Reviews</h4>
            {(reviews[book.id] || []).map((r, i) => (
              <div key={i}>
                <b>{maskEmail(r.email)}</b> ⭐ {r.rating}
                <p>{r.comment}</p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}