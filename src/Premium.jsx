import { useEffect, useState } from "react";
import PremiumCard from "../components/PremiumCard";

const API_URL = "https://gishmaf-website-1.onrender.com";

export default function Premium() {
  const [isPremium, setIsPremium] = useState(false);

  const email = localStorage.getItem("email");

  useEffect(() => {
    if (!email) return;

    fetch(`${API_URL}/api/premium/check/${email}`)
      .then(res => res.json())
      .then(data => setIsPremium(data.premium))
      .catch(console.error);

  }, [email]);

  const handleSubscribe = async () => {
    let userEmail = email;

    if (!userEmail) {
      userEmail = prompt("Enter your email:");
      if (!userEmail) return;
      localStorage.setItem("email", userEmail);
    }

    const res = await fetch(`${API_URL}/api/premium/create-premium-session`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify({ email: userEmail }),
    });

    const data = await res.json();

    if (data.url) {
      window.location.href = data.url;
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Premium Access</h1>

      {isPremium ? (
        <h2>✅ You have access to premium videos</h2>
      ) : (
        <PremiumCard onSubscribe={handleSubscribe} />
      )}
    </div>
  );
}