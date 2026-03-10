

import React from "react";
import PremiumCard from "../components/PremiumCard";

export default function Premium() {

  const handleSubscribe = async () => {
    try {
      const response = await fetch(
        "https://gishmaf-website-1.onrender.com/api/premium/create-premium-session",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
        }
      );

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to create checkout session.");
      }

    } catch (error) {
      console.error(error);
      alert("Something went wrong.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Unlock Premium Movies</h2>
      <PremiumCard onSubscribe={handleSubscribe} />
    </div>
  );
}