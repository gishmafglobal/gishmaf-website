import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blogData";

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return <h2 style={{ padding: "40px" }}>Post not found</h2>;
  }

  return (
    <>
      {/* 🔥 SEO */}
      <Helmet>
        <title>{post.title} | Gishmaf Blog</title>
        <meta name="description" content={post.content.substring(0, 150)} />
      </Helmet>

      <section style={{ padding: "40px", maxWidth: "800px", margin: "0 auto" }}>
        <button onClick={() => navigate("/blog")}>
          ← Back to Blog
        </button>

        <h1 style={{ marginTop: "20px" }}>{post.title}</h1>

        <p style={{ marginTop: "20px", lineHeight: "1.8", whiteSpace: "pre-line" }}>
          {post.content}
        </p>
      </section>
    </>
  );
}