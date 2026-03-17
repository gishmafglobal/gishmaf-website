
// /frontend/src/components/PremiumCard.jsx
import React from "react";

export default function PremiumCard({ onSubscribe }) {
  return (
    <div
      onClick={onSubscribe}
      style={{
        cursor: "pointer",
        width: "300px",
        height: "200px",
        backgroundColor: "rgba(0,0,0,0.7)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        fontSize: "18px",
        textAlign: "center",
      }}
    >
      Click to Subscribe & Unlock Premium
    </div>
  );
}