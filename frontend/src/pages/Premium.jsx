// import React, { useEffect, useState } from "react";
// import PremiumCard from "../components/PremiumCard";

// export default function Premium() {
//   const [videos, setVideos] = useState([]);
//   const [message, setMessage] = useState(
//     "Unlock exclusive premium movies now!"
//   );

//   useEffect(() => {
//     // Fetch premium videos from backend
//     fetch(`${import.meta.env.VITE_API_URL}/api/premium`)
//       .then((res) => res.json())
//       .then((data) => setVideos(data))
//       .catch((err) => console.log(err));

//     // Looping typewriter-like message
//     const messages = [
//       "Unlock exclusive premium movies now!",
//       "Subscribe today for VIP content!",
//       "Access top movies only for premium users!",
//     ];
//     let i = 0;
//     const interval = setInterval(() => {
//       setMessage(messages[i]);
//       i = (i + 1) % messages.length;
//     }, 4000);

//     return () => clearInterval(interval);
//   }, []);

//   const handleSubscribe = () => {
//     // Redirect to your subscription page on your website
//     window.open("https://gishmaf-website-2.onrender.com/subscribe", "_blank");
//   };

//   return (
//     <div style={{ padding: "20px", minHeight: "80vh", background: "#121212" }}>
//       <h2 style={{ color: "white", textAlign: "center", marginBottom: "20px" }}>
//         {message}
//       </h2>

//       <button
//         onClick={handleSubscribe}
//         style={{
//           display: "block",
//           margin: "0 auto 30px auto",
//           padding: "12px 24px",
//           fontSize: "18px",
//           background: "red",
//           color: "white",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//         }}
//       >
//         Subscribe Now
//       </button>

//       <div
//         style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
//           gap: "15px",
//         }}
//       >
//         {videos.map((video) => (
//           <PremiumCard key={video._id} video={video} />
//         ))}
//       </div>
//     </div>
//   );
// }


import React from "react";
import PremiumCard from "../components/PremiumCard";

const PREMIUM_SESSION_URL =
  process.env.NODE_ENV === "development"
    ? "http://localhost:5000/api/premium/create-premium-session"
    : "https://gishmaf-website-1.onrender.com/api/premium/create-premium-session";

export default function Premium() {
  const handleSubscribe = async () => {
    try {
      const response = await fetch(PREMIUM_SESSION_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("Failed to create session");
      }

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session.");
      }
    } catch (error) {
      console.error("Premium error:", error);
      alert("Unable to connect to payment server.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Unlock Premium Movies</h2>
      <p>
        Subscribe to access all premium content. Subscription renews every 30 days.
      </p>

      <PremiumCard onSubscribe={handleSubscribe} />
    </div>
  );
}