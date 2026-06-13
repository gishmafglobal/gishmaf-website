// import { Link } from "react-router-dom";

// export default function Footer() {
//   return (
//     <footer
//       className="footer"
//       style={{
//         padding: "30px 20px",
//         borderTop: "1px solid #eee",
//         marginTop: "50px",
//         backgroundColor: "#0f172a",
//         color: "#fff",
//         textAlign: "center",
//       }}
//     >
//       {/* 🔹 BRAND / DESCRIPTION */}
//       <div style={{ maxWidth: "900px", margin: "0 auto" }}>
//         <h3 style={{ marginBottom: "10px" }}>
//           Gishmaf Global Concept
//         </h3>

//         <p style={{ fontSize: "14px", lineHeight: "1.6", color: "#ccc" }}>
//           Gishmaf Global Concept is a digital platform focused on empowering
//           individuals through knowledge, skills, creativity, and innovation.
//           We provide valuable resources, educational content, and consultancy
//           services to support growth and success.
//         </p>
//       </div>

//       {/* 🔹 NAV LINKS */}
//       <div
//         style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: "20px",
//           flexWrap: "wrap",
//           marginTop: "20px",
//         }}
//       >
//         <Link to="/" style={{ color: "#f5b942" }}>Home</Link>
//         <Link to="/about" style={{ color: "#f5b942" }}>About</Link>
//         <Link to="/blog" style={{ color: "#f5b942" }}>Blog</Link>
//         <Link to="/contact" style={{ color: "#f5b942" }}>Contact</Link>
//         <Link to="/privacy" style={{ color: "#f5b942" }}>Privacy Policy</Link>
//         <Link to="/terms" style={{ color: "#f5b942" }}>Terms & Conditions</Link>
//       </div>

//       {/* 🔹 CONTACT INFO */}
//       <div style={{ marginTop: "20px", fontSize: "14px", color: "#ccc" }}>
//         <p>Email: gishmafglobal@gmail.com</p>
//         <p>Locations: United Kingdom, United States of America, Nigeria</p>
//       </div>

//       {/* 🔹 COPYRIGHT */}
//       <p style={{ marginTop: "20px", fontSize: "12px", color: "#888" }}>
//         © {new Date().getFullYear()} Gishmaf Global Concept. All rights reserved.
//       </p>
//     </footer>
//   );
// }


import { Link } from "react-router-dom";

export default function Footer() {
  const linkStyle = {
    color: "#cbd5e1",
    textDecoration: "none",
    fontSize: "14px",
    marginBottom: "8px",
    display: "block",
    transition: "all 0.3s ease",
  };

  const hoverStyle = {
    color: "#ffffff",
    textShadow: "0 0 10px #f5b942, 0 0 20px #f5b942",
    transform: "translateX(6px)",
  };

  const container = {
    maxWidth: "1100px",
    margin: "auto",
    padding: "0 20px",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "30px",
  };

  const footer = {
    background: "linear-gradient(135deg, #0f172a, #111827)",
    color: "#fff",
    marginTop: "60px",
    paddingTop: "40px",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  };

  const bottom = {
    marginTop: "40px",
    padding: "15px",
    textAlign: "center",
    fontSize: "12px",
    color: "#94a3b8",
    borderTop: "1px solid rgba(255,255,255,0.05)",
  };

  const titleGlow = {
    color: "#f5b942",
    animation: "glow 3s ease-in-out infinite alternate",
  };

  return (
    <footer style={footer}>
      <div style={container}>

        {/* BRAND */}
        <div>
          <h2 style={titleGlow}>Gishmaf Global Concept</h2>
          <p style={{ color: "#cbd5e1", fontSize: "14px", lineHeight: "1.6" }}>
            Empowering individuals through knowledge, skills, creativity, and innovation.
            We provide digital resources, education, and consultancy for growth and success.
          </p>
        </div>

        {/* LINKS */}
        <div>
          <h4 style={{ color: "#f5b942", marginBottom: "10px" }}>Quick Links</h4>

          {[
            { to: "/", label: "Home" },
            { to: "/about", label: "About" },
            { to: "/blog", label: "Blog" },
            { to: "/contact", label: "Contact" },
            { to: "/privacy", label: "Privacy" },
            { to: "/terms", label: "Terms" },
          ].map((item, i) => (
            <LinkHover key={i} to={item.to} label={item.label} linkStyle={linkStyle} hoverStyle={hoverStyle} />
          ))}
        </div>

        {/* CONTACT */}
        <div>
          <h4 style={{ color: "#f5b942", marginBottom: "10px" }}>Contact</h4>
          <p style={{ color: "#cbd5e1", fontSize: "14px" }}>📧 gishmafglobal@gmail.com</p>
          <p style={{ color: "#cbd5e1", fontSize: "14px" }}>🌍 UK • USA • Nigeria</p>
        </div>
      </div>

      <div style={bottom}>
        © {new Date().getFullYear()} Gishmaf Global Concept. All rights reserved.
      </div>

      {/* INLINE KEYFRAME (React hack via style tag) */}
      <style>
        {`
          @keyframes glow {
            from {
              text-shadow: 0 0 5px rgba(245,185,66,0.3);
            }
            to {
              text-shadow: 0 0 15px rgba(245,185,66,0.9);
            }
          }
        `}
      </style>
    </footer>
  );
}

/* 🔥 Hover Link Component */
function LinkHover({ to, label, linkStyle, hoverStyle }) {
  return (
    <Link
      to={to}
      style={linkStyle}
      onMouseEnter={(e) => {
        Object.assign(e.target.style, hoverStyle);
      }}
      onMouseLeave={(e) => {
        Object.assign(e.target.style, linkStyle);
      }}
    >
      {label}
    </Link>
  );
}