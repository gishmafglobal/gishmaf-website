// import { useEffect, useState } from "react";
// import "./bookshelf.css";

// export default function BookShelf() {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     fetch("http://https://gishmaf-website.onrender.com/api/books")
//       .then((res) => res.json())
//       .then((data) => setBooks(data));
//   }, []);

//   return (
//     <div className="shelf">
//       {books.map((book, index) => (
//         <div className="book-card" key={index}>
//           <img src={book.cover} alt={book.title} />
//           <h3>{book.title}</h3>
//           <p>{book.author}</p>
//           <a href={book.readLink} target="_blank" rel="noreferrer">
//             <button>Read Book</button>
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import { API_URL } from "../api";
// import "./bookshelf.css";

// export default function BookShelf() {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     fetch(`${API_URL}/api/books`)
//       .then((res) => res.json())
//       .then((data) => setBooks(data))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="shelf">
//       {books.map((book, index) => (
//         <div className="book-card" key={index}>
//           <img src={book.cover} alt={book.title} />
//           <h3>{book.title}</h3>
//           <p>{book.author}</p>
//           <a href={book.readLink} target="_blank" rel="noreferrer">
//             <button>Read Book</button>
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// }

// import { useEffect, useState } from "react";
// import "./bookshelf.css";

// const API_URL = import.meta.env.VITE_API_URL;

// export default function BookShelf() {
//   const [books, setBooks] = useState([]);

//   useEffect(() => {
//     fetch(`${API_URL}/api/books`)
//       .then((res) => res.json())
//       .then((data) => setBooks(data))
//       .catch((err) => console.log(err));
//   }, []);

//   return (
//     <div className="shelf">
//       {books.map((book, index) => (
//         <div className="book-card" key={index}>
//           <img src={book.cover} alt={book.title} />
//           <h3>{book.title}</h3>
//           <p>{book.author}</p>
//           <a href={book.readLink} target="_blank" rel="noreferrer">
//             <button>Read Book</button>
//           </a>
//         </div>
//       ))}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { API_URL } from "../api";
import "./bookshelf.css";

export default function BookShelf() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/books`)
      .then((res) => res.json())
      .then((data) => setBooks(data))
      .catch((err) => console.log(err));
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
