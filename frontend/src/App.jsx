

// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import { Routes, Route } from "react-router-dom";

// import Home from "./pages/Home";
// import About from "./pages/About";
// import Books from "./pages/Books";
// import Skills from "./pages/Skills";
// import Consultancy from "./pages/Consultancy";
// import Music from "./pages/Music";
// import Contact from "./pages/Contact";
// // import Admin from "./pages/Admin";

// export default function App() {
//   return (
//     <>
//       <Navbar />

//       <Routes>
//         {/* FIRST PAGE */}
//         <Route path="/" element={<Home />} />

//         {/* OTHER PAGES */}
//         <Route path="/about" element={<About />} />
//         <Route path="/books" element={<Books />} />
//         <Route path="/skills" element={<Skills />} />
//         <Route path="/consultancy" element={<Consultancy />} />
//         <Route path="/music" element={<Music />} />
//         <Route path="/contact" element={<Contact />} />

//         {/* ADMIN LAST */}
//         {/* <Route path="/admin" element={<Admin />} /> */}
//       </Routes>

//       <Footer />
//     </>
//   );
// }

import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import About from "./pages/About";
import Books from "./pages/Books";
import Skills from "./pages/Skills";
import Consultancy from "./pages/Consultancy";
import Music from "./pages/Music";
import Contact from "./pages/Contact";
// import Admin from "./pages/Admin";

export default function App() {
  return (
    <div className="app-container">
      <Navbar />

      <main style={{ minHeight: "80vh" }}>
        <Routes>
          {/* Home */}
          <Route path="/" element={<Home />} />

          {/* Main Pages */}
          <Route path="/about" element={<About />} />
          <Route path="/books" element={<Books />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/consultancy" element={<Consultancy />} />
          <Route path="/music" element={<Music />} />
          <Route path="/contact" element={<Contact />} />

          {/* Future Admin */}
          {/* <Route path="/admin" element={<Admin />} /> */}
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
