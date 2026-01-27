import { useEffect, useState } from "react";
import logo from "../assets/logo.png";

export default function Contact() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/posts")
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


// import logo from "../assets/logo.png";
// // import hero from "../assets/hero.jpg";
// import "./contact.css";

// export default function Contact() {
//   return (
//     <div className="contact-page">
//       <div className="contact-header">
//         <img src={logo} alt="Gishmaf Logo" className="logo" />
//         <h1>Contact Gishmaf Global Concept</h1>
//         <p>
//           Connecting people, ideas, and opportunities across the world.
//         </p>
//       </div>

//       <div className="contact-hero">
//         <img src={contactImg} alt="Gishmaf Contact" />
//       </div>

//       <div className="contact-content">
//         <p>
//           Gishmaf Global Concept is a vision-driven platform committed to
//           empowering individuals and organizations through knowledge,
//           creativity, technology, and innovation. Our mission reaches beyond
//           borders — serving people locally, nationally, and internationally.
//         </p>

//         <p>
//           Whether you are looking to learn a skill, start a project, seek
//           guidance, collaborate, or connect with our services, we are always
//           open and ready to hear from you.
//         </p>

//         <p>
//           We believe communication is the first step toward transformation and
//           opportunity. Reach out to us from anywhere in the world and we will
//           respond promptly.
//         </p>
//       </div>

//       <div className="contact-email">
//         <h2>Reach Us Directly</h2>
//         <a href="mailto:info@gishmafglobal.com">
//           info@gishmafglobal.com
//         </a>
//       </div>
//     </div>
//   );
// }
