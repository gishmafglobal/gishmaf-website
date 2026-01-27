import BookShelf from "../components/BookShelf";

export default function Book() {
  return (
    <div>
      <h1 style={{ textAlign: "center", marginTop: "20px" }}>
        Online Library
      </h1>
      <BookShelf />
    </div>
  );
}
