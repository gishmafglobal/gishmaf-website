import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = "https://gishmaf-website-1.onrender.com";

export default function BookSuccess() {
  const [searchParams] = useSearchParams();
  const [downloadUrl, setDownloadUrl] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get("session_id");
    if (!sessionId) return;

    fetch(`${API_URL}/api/books/verify-session?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.downloadUrl) {
          setDownloadUrl(data.downloadUrl);

          // Auto-download
          const link = document.createElement("a");
          link.href = data.downloadUrl;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        } else {
          alert("Payment verification failed");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Payment verification failed");
      });
  }, [searchParams]);

  return (
    <div style={{ textAlign: "center", marginTop: 80 }}>
      {downloadUrl ? (
        <h2>🎉 Your book is downloading...</h2>
      ) : (
        <h2>Verifying payment...</h2>
      )}
    </div>
  );
}