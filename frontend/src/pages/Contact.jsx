import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Contact() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://gishmaf-website.onrender.com/posts")
      .then(res => res.json())
      .then(data => {
        setPosts(data.filter(p => p.section === "contact"));
      });
  }, []);

  return (
    <div style={{ padding: "60px 30px", fontFamily: "Arial, Helvetica, sans-serif" }}>
      
      {/* HEADER WITH LOGO */}
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <img src={logo} alt="Gishmaf Logo" style={{ width: "80px" }} />
        <h1>Contact Gishmaf Global Concept</h1>
        <p style={{ color: "gray" }}>
          Reaching people locally, nationally and internationally through knowledge,
          creativity and innovation.
        </p>
      </div>

      {/* STATIC MESSAGE */}
      <div style={{ maxWidth: "900px", margin: "auto", lineHeight: "1.7" }}>
        <p>
          Gishmaf Global Concept is a vision-driven platform committed to empowering
          individuals and organizations across the world. No matter where you are
          located, you can reach out to us for learning, collaboration, consultancy,
          and support.
        </p>

        <p>
          We believe communication is the first step toward opportunity and
          transformation. Our team is always ready to respond and guide you.
        </p>
      </div>

      {/* EMAIL */}
      <div style={{
        marginTop: "30px",
        textAlign: "center",
        background: "#f4f4f4",
        padding: "20px",
        borderRadius: "8px"
      }}>
        <h2>Reach Us Directly</h2>
        <a
          href="mailto:info@gishmafglobal.com"
          style={{ fontSize: "18px", fontWeight: "bold", color: "black", textDecoration: "none" }}
        >
          info@gishmafglobal.com
        </a>
      </div>

      {/* YOUR ADMIN POSTS STILL SHOW BELOW */}
      <div style={{ marginTop: "50px" }}>
        {posts.map(p => (
          <div key={p._id} style={{ marginTop: "20px" }}>
            <h2>{p.title}</h2>
            <p>{p.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

