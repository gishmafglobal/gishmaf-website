import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        {logo && <img src={logo} alt="Gishmaf logo" />}
        <h1>
          GISHMAF <span>Global Concept</span>
        </h1>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/books">Book Shelf</Link></li>
        <li><Link to="/skills">Skill Hub</Link></li>
        <li><Link to="/consultancy">Consultancy</Link></li>
        <li><Link to="/music">Music</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        <li><Link to="/premium">Premium</Link></li>
        {/* <li><Link to="/privacy">Privacy Policy</Link></li> */}
      </ul>
    </nav>
  );
}