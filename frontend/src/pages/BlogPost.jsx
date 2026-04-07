import { useParams, useNavigate } from "react-router-dom";
import { blogPosts } from "../data/blogData";
import appIcon from "../assets/app_icon1.png";

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();

  const post = blogPosts.find((p) => p.id === parseInt(id));

  const movies = [
    {
      title: "Action Blockbuster",
      image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1"
    },
    {
      title: "Romantic Drama",
      image: "https://images.unsplash.com/photo-1517602302552-471fe67acf66"
    },
    {
      title: "Sci-Fi Adventure",
      image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1"
    },
    {
      title: "Thriller Mystery",
      image: "https://images.unsplash.com/photo-1505686994434-e3cc5abf1330"
    },
    {
      title: "Comedy Hit",
      image: "https://images.unsplash.com/photo-1524985069026-dd778a71c7b4"
    },
    {
      title: "Epic Fantasy",
      image: "https://images.unsplash.com/photo-1497032205916-ac775f0649ae"
    }
  ];

  if (!post) {
    return (
      <h2 style={{ padding: "40px", textAlign: "center" }}>
        Post not found
      </h2>
    );
  }

  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>

      {/* HERO SECTION */}
      <div
        style={{
          minHeight: "220px",
          background: "linear-gradient(to right, #000, #222)",
          color: "#fff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        <h1 style={{ fontSize: "clamp(22px, 4vw, 36px)", maxWidth: "800px" }}>
          {post.title}
        </h1>

        <p style={{ marginTop: "10px", fontSize: "14px", color: "#ccc" }}>
          By Gabriel M. Gishmaf • {new Date().toDateString()} • 5 min read
        </p>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "30px 20px" }}>

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate("/blog")}
          style={{
            marginBottom: "25px",
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
        <p
          style={{
            lineHeight: "1.9",
            fontSize: "17px",
            whiteSpace: "pre-line",
          }}
        >
          {post.content}
        </p>

        {/* MOVIE SECTION */}
        <div style={{ marginTop: "60px" }}>
          <h2 style={{ marginBottom: "25px" }}>
            🎬 Stream Latest Movies (2025 – 2026)
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "25px",
            }}
          >
            {movies.map((movie, index) => (
              <div
                key={index}
                style={{
                  background: "#111",
                  borderRadius: "12px",
                  overflow: "hidden",
                  position: "relative",
                  cursor: "pointer",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-6px)";
                  e.currentTarget.style.boxShadow =
                    "0 10px 25px rgba(0,0,0,0.5)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                {/* PREMIUM BADGE */}
                <div
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    background: "#e50914",
                    color: "#fff",
                    fontSize: "11px",
                    padding: "4px 8px",
                    borderRadius: "4px",
                    zIndex: 2,
                  }}
                >
                  PREMIUM
                </div>

                {/* PLAY ICON */}
                <div
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "rgba(0,0,0,0.6)",
                    borderRadius: "50%",
                    width: "55px",
                    height: "55px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#fff",
                    fontSize: "22px",
                    zIndex: 2,
                  }}
                >
                  ▶
                </div>

                <img
                  src={movie.image}
                  alt={movie.title}
                  style={{
                    width: "100%",
                    height: "220px",
                    objectFit: "cover",
                    transition: "transform 0.4s ease",
                  }}
                />

                <div style={{ padding: "15px", color: "#fff" }}>
                  <h4>{movie.title}</h4>
                  <p style={{ fontSize: "12px", color: "#bbb" }}>
                    2025 • HD Streaming
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ANDROID APP PROMO */}
        <div
          style={{
            marginTop: "80px",
            padding: "40px 25px",
            borderRadius: "16px",
            background: "linear-gradient(to right, #000, #111)",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <img
            src={appIcon}
            alt="Gishmaf Streaming App"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "24px",
              marginBottom: "20px",
            }}
          />

          <h3 style={{ fontSize: "26px" }}>
            🎬 Android Movie Streaming App
          </h3>

          <p style={{ marginTop: "15px", lineHeight: "1.7" }}>
            Designed specifically for Android users, our mobile streaming app
            gives you instant access to a growing library of movies and series
            from 2025 and 2026. Enjoy smooth, high-quality entertainment
            wherever you are.
          </p>

          <ul
            style={{
              marginTop: "25px",
              lineHeight: "1.8",
              textAlign: "left",
              display: "inline-block",
            }}
          >
            <li>✔ Built for Android smartphones and tablets</li>
            <li>✔ Stream latest movies (2025 & 2026)</li>
            <li>✔ Fast, smooth interface</li>
            <li>✔ Watch anytime, anywhere</li>
          </ul>

          <a
            href="https://play.google.com/store/apps/details?id=com.gishmaf.gishtube"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "inline-block",
              marginTop: "30px",
              padding: "15px 35px",
              background: "#34a853",
              color: "#fff",
              borderRadius: "8px",
              textDecoration: "none",
              fontWeight: "bold",
              fontSize: "16px",
              transition: "0.3s",
            }}
          >
            Download for Android
          </a>
        </div>
      </div>
    </div>
  );
}