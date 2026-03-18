import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Main Pages
import Home from "./pages/Home";
import About from "./pages/About";
import Books from "./pages/Books";
import Skills from "./pages/Skills";
import Consultancy from "./pages/Consultancy";
import Music from "./pages/Music";
import Contact from "./pages/Contact";
import Comments from "./pages/Comments";
import Privacy from "./pages/Privacy";

// Payment Pages
import Premium from "./pages/Premium";
import BookSuccess from "./pages/BookSuccess";
import PremiumSuccess from "./pages/PremiumSuccess";

export default function App() {
  return (
    <>
      <Navbar />

      <div style={{ minHeight: "80vh" }}>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Books />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/consultancy" element={<Consultancy />} />
          <Route path="/music" element={<Music />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/comments" element={<Comments />} />
          <Route path="/privacy" element={<Privacy />} />

          {/* Payment Routes */}
          <Route path="/premium" element={<Premium />} />
          <Route path="/book-success" element={<BookSuccess />} />
          <Route path="/premium-success" element={<PremiumSuccess />} />

          {/* Fallback */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>

      <Footer />
    </>
  );
}