import { useEffect, useState } from "react";
import PremiumCard from "../components/PremiumCard";

const API_URL = import.meta.env.VITE_API_URL;

export default function Premium() {
  const [isPremium, setIsPremium] = useState(false);
  const [loading, setLoading] = useState(false);

  const email = localStorage.getItem("email");

  // =========================
  // CHECK PREMIUM STATUS
  // =========================
  useEffect(() => {
    if (!email) return;

    const checkStatus = async () => {
      try {
        const res = await fetch(`${API_URL}/api/premium/check/${email}`);
        const data = await res.json();
        console.log("Premium status:", data);
        setIsPremium(data.premium);
      } catch (err) {
        console.error("Check error:", err);
      }
    };

    checkStatus();
  }, [email]);

  // =========================
  // SUBSCRIBE HANDLER
  // =========================
  const handleSubscribe = async () => {
    let userEmail = email;

    if (!userEmail) {
      userEmail = prompt("Enter your email:");
      if (!userEmail) return;
      localStorage.setItem("email", userEmail);
    }

    try {
      setLoading(true);

      const res = await fetch(
        `${API_URL}/api/premium/create-premium-session`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: userEmail }),
        }
      );

      const data = await res.json();
      console.log("BACKEND RESPONSE:", data);

      if (res.ok && data.url) {
        window.location.href = data.url; // Redirect to Stripe
      } else {
        alert(data.error || "Failed to start premium session.");
      }
    } catch (err) {
      console.error("Frontend error:", err);
      alert("Network error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // UI
  // =========================
  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Premium Access</h1>

      {loading && <p>Redirecting to payment...</p>}

      {isPremium ? (
        <h2>✅ You have access to premium content</h2>
      ) : (
        <PremiumCard onSubscribe={handleSubscribe} />
      )}
    </div>
  );
}