import { useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blogData";

export default function Blog() {
  const navigate = useNavigate();

  return (
    <section style={{ padding: "40px", maxWidth: "900px", margin: "0 auto" }}>
      <h1>Blog</h1>

      <p>Read our latest insights on growth, skills, and success.</p>

      {blogPosts.map((post) => (
        <div
          key={post.id}
          onClick={() => navigate(`/blog/${post.id}`)}
          style={{
            marginTop: "20px",
            padding: "20px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            cursor: "pointer",
          }}
        >
          <h2>{post.title}</h2>
          <p>{post.content.substring(0, 100)}...</p>
        </div>
      ))}
    </section>
  );
}