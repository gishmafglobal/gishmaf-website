import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blogData";
import appIcon from "../assets/app_icon1.png";

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.id === parseInt(id));

  if (!post) {
    return (
      <h2 style={{ padding: "40px", textAlign: "center" }}>
        Post not found
      </h2>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      
      {/* 🔥 HERO SECTION */}
      <div
        style={{
          height: "250px",
          background: "linear-gradient(to right, #000, #222)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "30px",
        }}
      >
        <h1 style={{ fontSize: "32px", maxWidth: "800px" }}>
          {post.title}
        </h1>

        <p style={{ marginTop: "10px", fontSize: "14px", color: "#ccc" }}>
          By Gabriel M. Gishmaf • {new Date().toDateString()} • 5 min read
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: "900px", margin: "0 auto", padding: "30px 20px" }}>
        
        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/blog")}
          style={{
            marginBottom: "20px",
            padding: "8px 15px",
            border: "none",
            background: "#eee",
            cursor: "pointer",
            borderRadius: "6px",
          }}
        >
          ← Back to Blog
        </button>

        {/* BLOG CONTENT */}
        <p style={{ lineHeight: "1.9", fontSize: "17px", whiteSpace: "pre-line" }}>
          {post.content}
        </p>

        {/* 🎬 STREAM LATEST MOVIES SECTION */}
        <div style={{ marginTop: "50px" }}>
          <h2 style={{ marginBottom: "20px" }}>
            🎬 Stream Latest Movies (2025 – 2026)
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
              gap: "20px",
            }}
          >
            {[
              "Action Blockbuster",
              "Romantic Drama",
              "Sci-Fi Adventure",
              "Thriller Mystery",
              "Comedy Hit",
              "Epic Fantasy",
            ].map((movie, index) => (
              <div
                key={index}
                style={{
                  background: "#111",
                  color: "#fff",
                  padding: "15px",
                  borderRadius: "10px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    height: "120px",
                    background: "#333",
                    borderRadius: "8px",
                    marginBottom: "10px",
                  }}
                ></div>

                <h4 style={{ fontSize: "14px" }}>{movie}</h4>
                <p style={{ fontSize: "12px", color: "#bbb" }}>
                  2025 • HD Streaming
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 🎬 ANDROID APP PROMO */}
<div
  style={{
    marginTop: "60px",
    padding: "30px",
    borderRadius: "12px",
    background: "#000",
    color: "#fff",
    textAlign: "center",
  }}
>
  <img
    src={appIcon}
    alt="Gishmaf Streaming App"
    style={{
      width: "90px",
      height: "90px",
      borderRadius: "20px",
      marginBottom: "15px",
    }}
  />

  <h3 style={{ fontSize: "24px" }}>
    🎬 Android Movie Streaming App
  </h3>

  <p style={{ marginTop: "10px", lineHeight: "1.7" }}>
    Designed specifically for Android users, our mobile streaming app gives you
    instant access to a growing library of movies and series from 2025 and 2026.
    Whether you're at home or on the move, you can enjoy smooth, high-quality
    entertainment directly on your Android device.
  </p>

  <ul
    style={{
      marginTop: "20px",
      lineHeight: "1.8",
      textAlign: "left",
      display: "inline-block",
    }}
  >
    <li>✔ Built for Android smartphones and tablets</li>
    <li>✔ Stream latest movies (2025 & 2026)</li>
    <li>✔ Fast, smooth, and easy-to-use interface</li>
    <li>✔ Watch anytime, anywhere</li>
  </ul>

  <p style={{ marginTop: "15px", fontSize: "13px", color: "#bbb" }}>
    Available on the Google Play Store for Android users.
  </p>

  <a
    href="https://play.google.com/store/apps/details?id=com.gishmaf.gishtube"
    target="_blank"
    rel="noreferrer"
    style={{
      display: "inline-block",
      marginTop: "20px",
      padding: "14px 30px",
      background: "#34a853",
      color: "#fff",
      borderRadius: "6px",
      textDecoration: "none",
      fontWeight: "bold",
      fontSize: "16px",
    }}
  >
    Download for Android
  </a>
</div>
      </div>
    </div>
  );
}