// frontend/src/pages/Premium.jsx
import { useEffect, useState } from "react";
import PremiumCard from "../components/PremiumCard";

const API_URL = "https://gishmaf-website-1.onrender.com";

export default function Premium() {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email");

  // Check premium status
  useEffect(() => {
    if (!email) return;
    fetch(`${API_URL}/api/premium/check/${email}`)
      .then((res) => res.json())
      .then((data) => setIsPremium(data.premium))
      .catch(console.error);
  }, [email]);

  // Handle Subscribe
  const handleSubscribe = async () => {
    let userEmail = email;

    if (!userEmail) {
      userEmail = prompt("Enter your email (receipt will be sent):");
      if (!userEmail) return;
      localStorage.setItem("email", userEmail);
    }

    try {
      setLoading(true);

      const res = await fetch(`${API_URL}/api/premium/create-premium-session`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: userEmail }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Failed to start premium session. Try again.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Premium Access</h1>

      {loading && <p>Redirecting to payment...</p>}

      {isPremium ? (
        <h2>✅ You have access to premium videos</h2>
      ) : (
        <PremiumCard onSubscribe={handleSubscribe} />
      )}
    </div>
  );
}