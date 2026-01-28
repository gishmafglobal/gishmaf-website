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

import book1 from "../assets/book1.jpg";
import book2 from "../assets/book2.jpg";

export default function Books() {
  const books = [
    {
      image: book1,
      title: "Escape from the Street",
      link: "https://selar.com/m/gabriel-m-gishmaf1",
    },
    {
      image: book2,
      title: "A Lonely Life Survivor",
      link: "https://selar.com/1726n1",
    },
  ];

  return (
    <div style={{ padding: "40px" }}>
      <h1 style={{ textAlign: "center", marginBottom: "40px" }}>
        Our Books
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
          gap: "30px",
        }}
      >
        {books.map((book, index) => (
          <a
            key={index}
            href={book.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <div
              style={{
                border: "1px solid #ddd",
                borderRadius: "10px",
                padding: "15px",
                textAlign: "center",
                cursor: "pointer",
                transition: "0.3s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "translateY(-8px)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "translateY(0)")
              }
            >
              <img
                src={book.image}
                alt={book.title}
                style={{
                  width: "100%",
                  height: "300px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  marginBottom: "15px",
                }}
              />
              <h3>{book.title}</h3>
              <p>Click to get this book</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
