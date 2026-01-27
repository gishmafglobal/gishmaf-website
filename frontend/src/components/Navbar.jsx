

// import logo from "../assets/logo.png";
// import { Link } from "react-router-dom";

// export default function Navbar() {
//   return (
//     <nav className="navbar">
//       <div className="nav-left">
//         <img src={logo} alt="logo" />
//         <h1>GISHMAF <span>Global Concept</span></h1>
//       </div>

//       <ul className="nav-links">
//         <li><Link to="/">Home</Link></li>
//         <li><Link to="/about">About</Link></li>
//         <li><Link to="/books">Book Shelf</Link></li>
//         <li><Link to="/skills">Skill Hub</Link></li>
//         <li><Link to="/consultancy">Consultancy</Link></li>
//         <li><Link to="/music">Music</Link></li>
//         <li><Link to="/contact">Contact</Link></li>
//       </ul>
//     </nav>
//   );
// }

import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <img src={logo} alt="logo" />
        <h1>GISHMAF <span>Global Concept</span></h1>
      </div>

      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/books">Book Shelf</Link></li>
        <li><Link to="/skills">Skill Hub</Link></li>
        <li><Link to="/consultancy">Consultancy</Link></li>
        <li><Link to="/music">Music</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {/* <li><Link to="/admin">Admin</Link></li> */}
      </ul>
    </nav>
  );
}
