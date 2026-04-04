import React, { useEffect, useState } from "react";

const API_URL = "https://gishmaf-website-1.onrender.com";

// 👉 CHANGE THIS to your app link
const APP_URL = "https://play.google.com/store/apps/details?id=com.gishmaf.gishtube"; 

export default function PremiumSuccess() {
  const [status, setStatus] = useState("Checking payment...");

  useEffect(() => {
    const email = localStorage.getItem("email");

    if (!email) {
      setStatus("No email found. Please subscribe again.");
      return;
    }

    const checkPremium = async () => {
      try {
        const res = await fetch(`${API_URL}/api/premium/check/${email}`);
        const data = await res.json();

        if (data.premium) {
          setStatus("✅ Premium activated! Redirecting...");

          // 🚀 REDIRECT TO YOUR APP
          setTimeout(() => {
            window.location.href = `${APP_URL}?premium=true&email=${email}`;
          }, 2000);

        } else {
          setStatus("⏳ Activating your premium access...");
          setTimeout(checkPremium, 3000);
        }
      } catch (err) {
        console.error(err);
        setStatus("Error verifying subscription.");
      }
    };

    checkPremium();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>🎉 Subscription Successful!</h1>
      <p>{status}</p>
    </div>
  );
}