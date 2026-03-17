import React from "react";

function Premium() {

  const handleSubscribe = async () => {
    try {
      const response = await fetch(
        "https://gishmaf-website-1.onrender.com/api/premium/create-premium-session",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: "testuser@gmail.com",
          }),
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
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>Premium Membership</h1>
      <p>Unlock exclusive premium content.</p>
      <button onClick={handleSubscribe}>
        Subscribe Now
      </button>
    </div>
  );
}

export default Premium;