import { useEffect, useState } from "react";
import "./bookshelf.css";

export default function BookShelf() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data));
  }, []);

  return (
    <div className="shelf">
      {books.map((book, index) => (
        <div className="book-card" key={index}>
          <img src={book.cover} alt={book.title} />
          <h3>{book.title}</h3>
          <p>{book.author}</p>
          <a href={book.readLink} target="_blank" rel="noreferrer">
            <button>Read Book</button>
          </a>
        </div>
      ))}
    </div>
  );
}
