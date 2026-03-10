import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = "https://gishmaf-website-1.onrender.com";

export default function BookSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [bookUrl, setBookUrl] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        if (!sessionId) {
          setError("Missing session ID.");
          setLoading(false);
          return;
        }

        const res = await fetch(
          `${API_URL}/api/books/verify-book-session?session_id=${sessionId}`
        );

        if (!res.ok) {
          throw new Error("Server error");
        }

        const data = await res.json();

        if (data.success && data.bookUrl) {
          setBookUrl(data.bookUrl);
        } else {
          setError("Payment not confirmed.");
        }
      } catch (err) {
        console.error("Verification error:", err);
        setError("Something went wrong verifying payment.");
      } finally {
        setLoading(false);
      }
    };

    verifyPayment();
  }, [sessionId]);

  if (loading) {
    return <h2 style={{ textAlign: "center" }}>Verifying payment...</h2>;
  }

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Purchase Successful 🎉</h1>

      {bookUrl ? (
        <>
          <a href={bookUrl} download>
            <button
              style={{
                padding: "12px 25px",
                fontSize: "16px",
                cursor: "pointer"
              }}
            >
              Download Your Book
            </button>
          </a>

          <h3 style={{ marginTop: "30px" }}>
            Please rate and review this book ⭐⭐⭐⭐⭐
          </h3>
        </>
      ) : (
        <h3 style={{ color: "red" }}>{error}</h3>
      )}
    </div>
  );
}