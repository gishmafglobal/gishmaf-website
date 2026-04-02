// import { useState, useEffect } from "react";
// import { loadStripe } from "@stripe/stripe-js";

// // ✅ Safe env variables
// const API_URL = import.meta.env.VITE_API_URL || "";
// const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || "";

// // ✅ Stripe initialization with safety check
// const stripePromise = STRIPE_PUBLIC_KEY ? loadStripe(STRIPE_PUBLIC_KEY) : null;
// if (!STRIPE_PUBLIC_KEY) console.error("⚠️ Stripe public key is missing! Check your VITE_STRIPE_PUBLIC_KEY in .env and Render secrets.");

// // Fake reviews
// const FAKE_REVIEWS = {
//   book1: [
//     { email: "alice@gmail.com", rating: 5, comment: "Absolutely loved this book!" },
//     { email: "john@yahoo.com", rating: 5, comment: "Incredible story!" },
//     { email: "sarah@yahoo.com", rating: 4, comment: "its a wow for me!" },
//     { email: "usman@yandex.com", rating: 4, comment: "its too long man,but quite ok though" },
//     { email: "steve@outlook.com", rating: 5, comment: "good one bro!" },
//     { email: "ayomide@hotmail.com", rating: 5, comment: "This is deep!" },
//   ],
//   book2: [
//     { email: "mike@yandex.com", rating: 5, comment: "Changed my perspective!" },
//     { email: "sarah@outlook.com", rating: 5, comment: "Very touching story." },
//     { email: "dola@yahoo.com", rating: 5, comment: "quite Incredible!" },
//     { email: "djmanny@gmail.com", rating: 3, comment: "nice one !" },
//     { email: "anny@doha.com", rating: 5, comment: "lovely!" },
//     { email: "tatu@yandex.com", rating: 4, comment: "hmm!" },
//     { email: "youjin@qq.com", rating: 5, comment: "this is really recommendable!" },
//     { email: "joy@gmail.com", rating: 5, comment: "really nice and a good book!" },
//   ],
// };

// export default function Books() {
//   const [email, setEmail] = useState(localStorage.getItem("email") || "");
//   const [loadingBook, setLoadingBook] = useState(null);
//   const [reviews, setReviews] = useState({});
//   const [ratings, setRatings] = useState({});

//   const books = [
//     { id: "book1", title: "Escape from the Street", image: "/images/book1.jpg" },
//     { id: "book2", title: "A Lonely Life Survivor", image: "/images/book2.jpg" },
//   ];

//   const maskEmail = (e) => {
//     if (!e) return "";
//     const [name, domain] = e.split("@");
//     return name.slice(0, 2) + "****@" + domain;
//   };

//   const handlePurchase = async (bookId) => {
//     if (!email.includes("@")) { alert("Enter a valid email"); return; }
//     if (!stripePromise) { alert("Stripe public key is missing. Check your env variables."); return; }
//     if (!API_URL) { alert("API URL is missing. Check your env variables."); return; }

//     localStorage.setItem("email", email);
//     setLoadingBook(bookId);

//     try {
//       console.log("[HANDLE PURCHASE] Starting purchase for book:", bookId);
//       console.log("[HANDLE PURCHASE] Using API_URL:", API_URL);
//       console.log("[HANDLE PURCHASE] Using STRIPE_PUBLIC_KEY:", STRIPE_PUBLIC_KEY?.substring(0, 10) + "…");

//       const res = await fetch(`${API_URL}/api/books/purchase`, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, bookId }),
//       });

//       console.log("[HANDLE PURCHASE] Response status:", res.status);
//       const text = await res.text();
//       console.log("[HANDLE PURCHASE] Raw response text:", text);

//       let data;
//       try { data = JSON.parse(text); } 
//       catch (err) {
//         console.error("❌ NOT JSON RESPONSE:", text);
//         alert("Server returned invalid response:\n" + text);
//         return;
//       }

//       console.log("[HANDLE PURCHASE] Backend response:", data);

//       if (data.sessionId) {
//         const stripe = await stripePromise;
//         await stripe.redirectToCheckout({ sessionId: data.sessionId });
//       } else {
//         alert(`Purchase failed: checkout session not created. Backend message: ${data.error || "no error info"}`);
//       }
//     } catch (err) {
//       console.error("[HANDLE PURCHASE ERROR]", err);
//       alert("Purchase failed: see console for details");
//     } finally {
//       setLoadingBook(null);
//     }
//   };

//   useEffect(() => {
//     const r = {};
//     const avg = {};
//     for (const b of books) {
//       r[b.id] = FAKE_REVIEWS[b.id] || [];
//       const reviewsList = r[b.id];
//       avg[b.id] = reviewsList.length > 0
//         ? { average: (reviewsList.reduce((acc, r) => acc + r.rating, 0) / reviewsList.length).toFixed(1), count: reviewsList.length }
//         : { average: "0.0", count: 0 };
//     }
//     setReviews(r);
//     setRatings(avg);
//   }, []);

//   return (
//     <div style={{ backgroundColor: "#f4f6f9", minHeight: "100vh", padding: "60px 20px", fontFamily: "Segoe UI, sans-serif", color: "#111" }}>
//       <h1 style={{ textAlign: "center", fontSize: "42px", fontWeight: "700", marginBottom: "30px" }}>📚 Our Books</h1>

//       {/* Email input */}
//       <div style={{ maxWidth: "400px", margin: "0 auto 40px auto" }}>
//         <input
//           type="email"
//           placeholder="Enter your email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           style={{ width: "100%", padding: "12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px" }}
//         />
//       </div>

//       {/* Book cards */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "40px", maxWidth: "1200px", margin: "0 auto" }}>
//         {books.map((book) => (
//           <div key={book.id} style={{ background: "#fff", borderRadius: "20px", padding: "25px", boxShadow: "0 10px 30px rgba(0,0,0,0.1)" }}>
//             <img src={book.image} alt={book.title} style={{ width: "100%", height: "300px", objectFit: "cover", borderRadius: "15px", marginBottom: "20px" }} />
//             <h2 style={{ fontSize: "22px", fontWeight: "600", marginBottom: "10px" }}>{book.title}</h2>
//             <div style={{ fontSize: "16px", fontWeight: "600", color: "#f59e0b", marginBottom: "15px" }}>⭐ {ratings[book.id]?.average} ({ratings[book.id]?.count} reviews)</div>
//             <button disabled={loadingBook === book.id} onClick={() => handlePurchase(book.id)} style={{ width: "100%", padding: "14px", borderRadius: "10px", border: "none", backgroundColor: "#111", color: "#fff", fontSize: "15px", fontWeight: "600", cursor: "pointer", marginBottom: "25px" }}>
//               {loadingBook === book.id ? "Processing..." : "Buy Book"}
//             </button>

//             <h4 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "15px" }}>Reviews</h4>
//             {(reviews[book.id] || []).map((r, index) => (
//               <div key={index} style={{ backgroundColor: "#f9fafb", padding: "15px", borderRadius: "12px", marginBottom: "12px", border: "1px solid #e5e7eb" }}>
//                 <div style={{ fontWeight: "600", fontSize: "14px", marginBottom: "5px" }}>{maskEmail(r.email)}</div>
//                 <div style={{ color: "#f59e0b", fontWeight: "600", marginBottom: "6px" }}>⭐ {r.rating}</div>
//                 <p style={{ fontSize: "14px", color: "#333", lineHeight: "1.6", margin: 0 }}>{r.comment}</p>
//               </div>
//             ))}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";

const API_URL = import.meta.env.VITE_API_URL || "";
const STRIPE_PUBLIC_KEY = import.meta.env.VITE_STRIPE_PUBLIC_KEY || "";

console.log("VITE_API_URL:", API_URL);
console.log("VITE_STRIPE_PUBLIC_KEY:", STRIPE_PUBLIC_KEY);

const stripePromise = STRIPE_PUBLIC_KEY ? loadStripe(STRIPE_PUBLIC_KEY) : null;

const FAKE_REVIEWS = {
  book1: [
    { email: "alice@gmail.com", rating: 5, comment: "Loved it!" },
    { email: "john@yahoo.com", rating: 4, comment: "Good read." },
  ],
  book2: [
    { email: "mike@yandex.com", rating: 5, comment: "Excellent!" },
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
    if (!email.includes("@")) { alert("Enter valid email"); return; }
    if (!stripePromise) { alert("Stripe public key missing"); console.error("Stripe key missing!"); return; }
    if (!API_URL) { alert("API URL missing"); console.error("API URL missing!"); return; }

    setLoadingBook(bookId);
    localStorage.setItem("email", email);

    try {
      const res = await fetch(`${API_URL}/api/books/purchase`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, bookId }),
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("❌ Backend error:", text);
        alert("Purchase failed, see console");
        return;
      }

      const data = await res.json();
      if (!data.sessionId) {
        console.error("❌ No sessionId returned:", data);
        alert("Purchase failed, see console");
        return;
      }

      const stripe = await stripePromise;
      const result = await stripe.redirectToCheckout({ sessionId: data.sessionId });
      if (result.error) console.error("❌ Stripe checkout error:", result.error);

    } catch (err) {
      console.error("❌ Purchase handler error:", err);
      alert("Purchase failed, see console");
    } finally {
      setLoadingBook(null);
    }
  };

  useEffect(() => {
    const r = {}, avg = {};
    for (const b of books) {
      r[b.id] = FAKE_REVIEWS[b.id] || [];
      const reviewsList = r[b.id];
      avg[b.id] = reviewsList.length
        ? { average: (reviewsList.reduce((a, r) => a + r.rating, 0) / reviewsList.length).toFixed(1), count: reviewsList.length }
        : { average: "0.0", count: 0 };
    }
    setReviews(r);
    setRatings(avg);
  }, []);

  return (
    <div style={{ padding: "40px", fontFamily: "Segoe UI, sans-serif" }}>
      <h1>📚 Our Books</h1>
      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter your email" style={{ padding: "10px", width: "300px", marginBottom: "20px" }} />
      <div style={{ display: "flex", gap: "20px" }}>
        {books.map(book => (
          <div key={book.id} style={{ border: "1px solid #ccc", padding: "20px", borderRadius: "10px" }}>
            <img src={book.image} alt={book.title} style={{ width: "200px", height: "250px", objectFit: "cover" }} />
            <h2>{book.title}</h2>
            <div>⭐ {ratings[book.id]?.average} ({ratings[book.id]?.count})</div>
            <button onClick={() => handlePurchase(book.id)} disabled={loadingBook === book.id} style={{ padding: "10px", marginTop: "10px" }}>
              {loadingBook === book.id ? "Processing..." : "Buy Book"}
            </button>
            <div>
              {reviews[book.id]?.map((r, i) => (
                <div key={i}>
                  {maskEmail(r.email)} - ⭐ {r.rating}: {r.comment}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}