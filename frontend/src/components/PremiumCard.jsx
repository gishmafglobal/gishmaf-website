// frontend/src/components/PremiumCard.jsx

import React from "react";

export default function PremiumCard({ onSubscribe }) {
  return (
    <div
      onClick={onSubscribe}
      style={{
        cursor: "pointer",
        padding: "30px",
        borderRadius: "10px",
        background: "#111",
        color: "#fff",
        maxWidth: "300px",
        margin: "0 auto",
        boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
      }}
    >
      <h3>🔥 Premium Plan</h3>
      <p>Unlimited access for 30 days</p>
      <p>Click here to subscribe</p>
    </div>
  );
}