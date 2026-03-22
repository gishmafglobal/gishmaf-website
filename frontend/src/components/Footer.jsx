// export default function Footer() {
//   return (
//     <footer className="footer">
//       © {new Date().getFullYear()} Gishmaf Global Concept. All rights reserved.
//     </footer>
//   );
// }

import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer
      className="footer"
      style={{
        padding: "20px",
        textAlign: "center",
        borderTop: "1px solid #eee",
        marginTop: "40px",
      }}
    >
      <p style={{ marginBottom: "10px" }}>
        © {new Date().getFullYear()} Gishmaf Global Concept. All rights reserved.
      </p>

      <div style={{ display: "flex", justifyContent: "center", gap: "20px", flexWrap: "wrap" }}>
        <Link to="/privacy">Privacy Policy</Link>
        <Link to="/terms">Terms & Conditions</Link>
        <Link to="/contact">Contact</Link>
      </div>

      <p style={{ marginTop: "10px", fontSize: "12px", color: "#777" }}>
        Gishmaf Global provides premium content, educational resources, and consultancy services designed to inspire growth and innovation.
      </p>
    </footer>
  );
}
