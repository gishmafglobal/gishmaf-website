import React from "react";

const Premium = () => {

  const handlePremium = async () => {
    const res = await fetch("http://localhost:5000/api/premium/create-premium-session", {
      method: "POST",
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div>
      <h1>Premium Movie Access</h1>

      <button onClick={handlePremium}>
        Subscribe Now
      </button>
    </div>
  );
};

export default Premium;