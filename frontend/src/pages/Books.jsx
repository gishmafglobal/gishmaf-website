// import BookShelf from "../components/BookShelf";

// export default function Book() {
//   return (
//     <div>
//       <h1 style={{ textAlign: "center", marginTop: "20px" }}>
//         Online Library
//       </h1>
//       <BookShelf />
//     </div>
//   );
// }

import "./books.css";

export default function Books() {
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
    <section className="books-page">
      <h1 className="books-title">Our Books</h1>

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
              <p>Click to get this book</p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
