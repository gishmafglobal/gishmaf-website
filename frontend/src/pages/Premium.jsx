// // src/pages/Premium.jsx
// import React from "react";
// import PremiumCard from "../components/PremiumCard";

// const PREMIUM_SESSION_URL = "https://gishmaf-website-1.onrender.com/api/premium/create-premium-session"; 

// export default function Premium() {
//   const handleSubscribe = async () => {
//     try {
//       const response = await fetch(PREMIUM_SESSION_URL, {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//       });

//       const data = await response.json();

//       if (data.url) {
//         window.location.href = data.url;
//       } else {
//         alert("Failed to create checkout session. Try again.");
//       }
//     } catch (error) {
//       console.error("Error creating premium session:", error);
//       alert("Something went wrong. Try again later.");
//     }
//   };

//   return (
//     <div style={{ padding: "20px" }}>
//       <h2>Unlock Premium Movies</h2>
//       <p>
//         Subscribe to access all premium content. Your subscription renews every
//         30 days.
//       </p>

//       <PremiumCard onSubscribe={handleSubscribe} />
//     </div>
//   );
// }

const handleSubscribe = async () => {
    try {
      const response = await fetch(
        "https://gishmaf-website-1.onrender.com/api/premium/create-premium-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
  
          body: JSON.stringify({
            email: "testuser@gmail.com" // 🔥 replace with logged-in user email
          }),
        }
      );
  
      const data = await response.json();
  
      if (data.url) {
        window.location.href = data.url;
      } else {
        alert(data.error || "Failed to create checkout session");
      }
  
    } catch (error) {
      console.error(error);
      alert("Something went wrong");
    }
  };