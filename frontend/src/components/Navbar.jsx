// import { Link } from "react-router-dom";
// import logo from "../assets/logo.png";

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="nav-left">
//         {logo && <img src={logo} alt="Gishmaf logo" />}
//         <h1>
//           GISHMAF <span>Global Concept</span>
//         </h1>
//       </div>

//       <ul className="nav-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/books">Book Shelf</Link></li>
//         <li><Link to="/skills">Skill Hub</Link></li>
//         <li><Link to="/consultancy">Consultancy</Link></li>
//         <li><Link to="/music">Music</Link></li>
//         <li><Link to="/contact">Contact</Link></li>
//         <li><Link to="/premium">Premium</Link></li>
//         <li><Link to="/privacy">Privacy Policy</Link></li>
//       </ul>
//     </nav>
//   );
// }


```jsx
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
        background: "rgba(10,10,10,0.92)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        padding: "12px 30px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {/* LOGO */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <img
          src={logo}
          alt="Gishmaf Logo"
          style={{
            width: "55px",
            height: "55px",
            objectFit: "contain",
          }}
        />

        <div>
          <h2
            style={{
              color: "#fff",
              margin: 0,
              fontSize: "1.4rem",
              fontWeight: "700",
            }}
          >
            GISHMAF
          </h2>

          <span
            style={{
              color: "#f5b942",
              fontSize: "13px",
              letterSpacing: "1px",
            }}
          >
            Global Concept
          </span>
        </div>
      </div>

      {/* NAV LINKS */}
      <ul
        style={{
          display: "flex",
          gap: "20px",
          listStyle: "none",
          margin: 0,
          padding: 0,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <li><Link style={linkStyle} to="/">Home</Link></li>
        <li><Link style={linkStyle} to="/about">About</Link></li>
        <li><Link style={linkStyle} to="/books">Book Shelf</Link></li>
        <li><Link style={linkStyle} to="/skills">Skill Hub</Link></li>
        <li><Link style={linkStyle} to="/consultancy">Consultancy</Link></li>
        <li><Link style={linkStyle} to="/music">Music</Link></li>
        <li><Link style={linkStyle} to="/contact">Contact</Link></li>

        <li>
          <Link
            to="/premium"
            style={{
              background: "#f5b942",
              color: "#111",
              padding: "10px 18px",
              borderRadius: "25px",
              textDecoration: "none",
              fontWeight: "700",
            }}
          >
            Premium
          </Link>
        </li>

        <li>
          <Link style={linkStyle} to="/privacy">
            Privacy
          </Link>
        </li>
      </ul>
    </nav>
  );
}

const linkStyle = {
  color: "#fff",
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "500",
};
```
