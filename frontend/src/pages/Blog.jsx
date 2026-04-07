import { useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blogData";

export default function Blog() {
  const navigate = useNavigate();

  return (
    <section style={{ padding: "40px", maxWidth: "1000px", margin: "0 auto" }}>
      <h1>Our Blog</h1>
      <p>Insights, knowledge, and ideas to help you grow.</p>

      {blogPosts.map((post) => (
        <div
          key={post.id}
          onClick={() => navigate(`/blog/${post.id}`)}
          style={{
            marginTop: "30px",
            border: "1px solid #ddd",
            borderRadius: "10px",
            overflow: "hidden",
            cursor: "pointer",
          }}
        >
          <img
            src={post.image}
            alt={post.title}
            style={{ width: "100%", height: "200px", objectFit: "cover" }}
          />

          <div style={{ padding: "20px" }}>
            <h2>{post.title}</h2>
            <p style={{ fontSize: "14px", color: "#777" }}>
              By {post.author} • {post.date}
            </p>
            <p>{post.content.substring(0, 120)}...</p>
          </div>
        </div>
      ))}
    </section>
  );
}