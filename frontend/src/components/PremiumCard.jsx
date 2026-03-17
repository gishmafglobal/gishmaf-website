
// // /frontend/src/components/PremiumCard.jsx
// import React from "react";

// export default function PremiumCard({ onSubscribe }) {
//   return (
//     <div
//       onClick={onSubscribe}
//       style={{
//         cursor: "pointer",
//         width: "300px",
//         height: "200px",
//         backgroundColor: "rgba(0,0,0,0.7)",
//         color: "white",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         borderRadius: "10px",
//         fontSize: "18px",
//         textAlign: "center",
//       }}
//     >
//       Click to Subscribe & Unlock Premium
//     </div>
//   );
// }

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
        }}
      >
        <h3>🔥 Premium Plan</h3>
        <p>Unlimited access for 30 days</p>
      </div>
    );
  }