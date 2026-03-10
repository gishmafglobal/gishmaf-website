// import { useEffect, useState } from "react";
// import { useSearchParams } from "react-router-dom";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function BookSuccess() {
//   const [searchParams] = useSearchParams();
//   const bookId = searchParams.get("bookId");
//   const [book, setBook] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (bookId) {
//       fetch(`${API_URL}/api/books/${bookId}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setBook(data);
//           setLoading(false);
//         })
//         .catch((err) => {
//           console.error("Failed to fetch book PDF:", err);
//           setLoading(false);
//         });
//     }
//   }, [bookId]);

//   if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
//   if (!book) return <p style={{ textAlign: "center" }}>Book not found.</p>;

//   return (
//     <div style={{ textAlign: "center", padding: "2rem" }}>
//       <h1>{book.title}</h1>
//       <p>Your purchase was successful! You can now read or download the book.</p>
      
//       <div style={{ marginTop: "2rem" }}>
//         <a
//           href={book.pdfUrl}
//           target="_blank"
//           rel="noopener noreferrer"
//           style={{
//             display: "inline-block",
//             padding: "10px 20px",
//             backgroundColor: "#ff3b30",
//             color: "#fff",
//             borderRadius: "5px",
//             marginRight: "10px",
//             textDecoration: "none"
//           }}
//         >
//           Read Book
//         </a>

//         <a
//           href={book.pdfUrl}
//           download={`${book.title}.pdf`}
//           style={{
//             display: "inline-block",
//             padding: "10px 20px",
//             backgroundColor: "#34c759",
//             color: "#fff",
//             borderRadius: "5px",
//             textDecoration: "none"
//           }}
//         >
//           Download PDF
//         </a>
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = "https://gishmaf-website-1.onrender.com";

export default function BookSuccess() {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  const [loading, setLoading] = useState(true);
  const [bookUrl, setBookUrl] = useState(null);

  useEffect(() => {
    const verifyPayment = async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/books/verify-book-session?session_id=${sessionId}`
        );

        const data = await res.json();

        if (data.success) {
          setBookUrl(data.bookUrl);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    if (sessionId) verifyPayment();
  }, [sessionId]);

  if (loading) return <h2>Verifying payment...</h2>;

  return (
    <div style={{ textAlign: "center", padding: "50px" }}>
      <h1>Purchase Successful 🎉</h1>

      {bookUrl ? (
        <>
          <a href={bookUrl} download>
            <button>Download Your Book</button>
          </a>

          <h3 style={{ marginTop: "30px" }}>
            Please rate and review this book ⭐⭐⭐⭐⭐
          </h3>
        </>
      ) : (
        <h3>Payment not confirmed.</h3>
      )}
    </div>
  );
}