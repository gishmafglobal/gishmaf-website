// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

// const API_URL = "https://gishmaf-website-1.onrender.com";

// export default function BookSuccess() {
//   const [searchParams] = useSearchParams();
//   const sessionId = searchParams.get("session_id");
//   const bookId = searchParams.get("bookId");

//   const [loading, setLoading] = useState(true);
//   const [bookUrl, setBookUrl] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const verifyPayment = async () => {
//       try {
//         if (!sessionId || !bookId) {
//           setError("Missing payment information.");
//           setLoading(false);
//           return;
//         }

//         const res = await fetch(
//           `${API_URL}/api/books/verify-book-session?session_id=${sessionId}&bookId=${bookId}`
//         );

//         const data = await res.json();

//         if (data.success && data.bookUrl) {
//           setBookUrl(data.bookUrl);
//         } else {
//           setError("Payment not confirmed.");
//         }
//       } catch (err) {
//         console.error(err);
//         setError("Verification failed.");
//       } finally {
//         setLoading(false);
//       }
//     };

//     verifyPayment();
//   }, [sessionId, bookId]);

//   if (loading) return <h2 style={{ textAlign: "center" }}>Verifying payment...</h2>;

//   return (
//     <div style={{ textAlign: "center", padding: "50px" }}>
//       <h1>Purchase Successful 🎉</h1>

//       {bookUrl ? (
//         <>
//           <a href={bookUrl} download>
//             <button style={{ padding: "12px 25px", cursor: "pointer" }}>
//               Download Your Book
//             </button>
//           </a>

//           <h3 style={{ marginTop: "30px" }}>
//             Please rate and review this book ⭐⭐⭐⭐⭐
//           </h3>
//         </>
//       ) : (
//         <h3 style={{ color: "red" }}>{error}</h3>
//       )}
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = "https://gishmaf-website-1.onrender.com";

export default function BookSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const bookId = searchParams.get("bookId");

  const [bookUrl, setBookUrl] = useState(null);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const email = localStorage.getItem("email");

  useEffect(() => {
    const verify = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/books/verify-book-session?session_id=${sessionId}&bookId=${bookId}`
        );

        const data = await res.json();

        if (data.success) {
          setBookUrl(data.bookUrl);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    verify();
  }, [sessionId, bookId]);

  const handleReview = async () => {
    try {
      await fetch(`${API_URL}/api/reviews`, {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({
          email,
          bookId,
          rating,
          comment,
        }),
      });

      alert("Review submitted!");
    } catch (err) {
      console.error(err);
      alert("Failed to submit review");
    }
  };

  if (loading) return <h2>Verifying payment...</h2>;

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>🎉 Purchase Successful</h1>

      {bookUrl && (
        <>
          <a href={bookUrl} target="_blank" rel="noreferrer">
            <button>📥 Download Book</button>
          </a>

          {/* REVIEW SECTION */}
          <div style={{ marginTop: "40px" }}>
            <h3>Leave a Review</h3>

            <select
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="5">⭐⭐⭐⭐⭐</option>
              <option value="4">⭐⭐⭐⭐</option>
              <option value="3">⭐⭐⭐</option>
              <option value="2">⭐⭐</option>
              <option value="1">⭐</option>
            </select>

            <br /><br />

            <textarea
              placeholder="Write your review..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <br /><br />

            <button onClick={handleReview}>Submit Review</button>
          </div>
        </>
      )}
    </div>
  );
}