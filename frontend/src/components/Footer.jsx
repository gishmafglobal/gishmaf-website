import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="footer"
      style={{
        padding: "30px 20px",
        borderTop: "1px solid #eee",
        marginTop: "50px",
        backgroundColor: "#0f172a",
        color: "#fff",
        textAlign: "center",
      }}
    >
      {/* 🔹 BRAND / DESCRIPTION */}
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        <h3 style={{ marginBottom: "10px" }}>
          Gishmaf Global Concept
        </h3>

        <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#ccc" }}>
          Gishmaf Global Concept is a digital platform focused on empowering
          individuals through knowledge, skills, creativity, and innovation.
          We provide valuable resources, educational content, and consultancy
          services to support growth and success.
        </p>
      </div>

      {/* 🔹 NAV LINKS */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          marginTop: "20px",
        }}
      >
        <Link to="/" style={{ color: "#f5b942" }}>Home</Link>
        <Link to="/about" style={{ color: "#f5b942" }}>About</Link>
        <Link to="/blog" style={{ color: "#f5b942" }}>Blog</Link>
        <Link to="/contact" style={{ color: "#f5b942" }}>Contact</Link>
        <Link to="/privacy" style={{ color: "#f5b942" }}>Privacy Policy</Link>
        <Link to="/terms" style={{ color: "#f5b942" }}>Terms & Conditions</Link>
      </div>

      {/* 🔹 CONTACT INFO */}
      <div style={{ marginTop: "20px", fontSize: "14px", color: "#ccc" }}>
        <p>Email: gishmafglobal@gmail.com</p>
        <p>Location: United Kingdom</p>
      </div>

      {/* 🔹 COPYRIGHT */}
      <p style={{ marginTop: "20px", fontSize: "12px", color: "#888" }}>
        © {new Date().getFullYear()} Gishmaf Global Concept. All rights reserved.
      </p>
    </footer>
  );
}