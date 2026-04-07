
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
