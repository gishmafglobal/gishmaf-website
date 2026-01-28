

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

export default function BookShelf() {
  const books = [
    {
      title: "Escape from the Street",
      image: "/images/book1.jpg",
      link: "https://selar.com/m/gabriel-m-gishmaf1",
    },
    {
      title: "A Lonely Life Survivor",
      image: "/images/book2.jpg",
      link: "https://selar.com/1726n1",
    },
  ];

  return (
    <div className="books-grid">
      {books.map((book, index) => (
        <a
          key={index}
          href={book.link}
          target="_blank"
          rel="noopener noreferrer"
          className="book-card"
        >
          <img src={book.image} alt={book.title} />
          <div className="book-info">
            <h3>{book.title}</h3>
          </div>
        </a>
      ))}
    </div>
  );
}
