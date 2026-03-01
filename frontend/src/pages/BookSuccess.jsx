import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function BookSuccess() {
  const [searchParams] = useSearchParams();
  const bookId = searchParams.get("bookId");
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (bookId) {
      fetch(`${API_URL}/api/books/${bookId}`)
        .then((res) => res.json())
        .then((data) => {
          setBook(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch book PDF:", err);
          setLoading(false);
        });
    }
  }, [bookId]);

  if (loading) return <p style={{ textAlign: "center" }}>Loading...</p>;
  if (!book) return <p style={{ textAlign: "center" }}>Book not found.</p>;

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h1>{book.title}</h1>
      <p>Your purchase was successful! You can now read or download the book.</p>
      
      <div style={{ marginTop: "2rem" }}>
        <a
          href={book.pdfUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#ff3b30",
            color: "#fff",
            borderRadius: "5px",
            marginRight: "10px",
            textDecoration: "none"
          }}
        >
          Read Book
        </a>

        <a
          href={book.pdfUrl}
          download={`${book.title}.pdf`}
          style={{
            display: "inline-block",
            padding: "10px 20px",
            backgroundColor: "#34c759",
            color: "#fff",
            borderRadius: "5px",
            textDecoration: "none"
          }}
        >
          Download PDF
        </a>
      </div>
    </div>
  );
}