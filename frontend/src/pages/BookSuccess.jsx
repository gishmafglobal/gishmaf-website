import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

export default function BookSuccess() {
  const [downloadUrl, setDownloadUrl] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const session_id = params.get("session_id");

    if (!session_id) return;

    fetch(`${API_URL}/api/books/verify-session?session_id=${session_id}`)
      .then((res) => res.json())
      .then((data) => {
        setDownloadUrl(data.downloadUrl);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "80px" }}>
      <h1>✅ Payment Successful</h1>

      {loading ? (
        <p>Verifying payment...</p>
      ) : downloadUrl ? (
        <a
          href={downloadUrl}
          style={{
            display: "inline-block",
            padding: "15px 25px",
            background: "#111",
            color: "#fff",
            borderRadius: "10px",
            textDecoration: "none",
            marginTop: "20px",
          }}
        >
          📥 Download Your Book
        </a>
      ) : (
        <p>❌ Unable to verify payment</p>
      )}
    </div>
  );
}