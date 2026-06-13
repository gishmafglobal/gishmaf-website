// import hero from "../assets/hero.jpg";
// import { motion } from "framer-motion";
// import { useNavigate } from "react-router-dom";

// export default function Hero() {
//   const navigate = useNavigate();

//   return (
//     <section
//       className="hero"
//       style={{
//         backgroundImage: `url(${hero})`,
//         backgroundSize: "cover",
//         backgroundPosition: "center",
//       }}
//     >
//       <motion.div
//         className="hero-content"
//         initial={{ x: -100, opacity: 0 }}
//         animate={{ x: 0, opacity: 1 }}
//         transition={{ duration: 1 }}
//       >
//         <h1>
//           Welcome to <br /> Gishmaf Global Concept
//         </h1>

//         <p className="gold">
//           Empowering Knowledge, Skills & Creativity
//         </p>

//         <p>
//           Discover books, learn valuable skills, and access resources designed
//           to help you grow and succeed in today’s world.
//         </p>

//         <div style={{ marginTop: "20px" }}>
//           <button
//             onClick={() => navigate("/about")}
//             style={{ marginRight: "10px" }}
//           >
//             Learn More
//           </button>

//           <button onClick={() => navigate("/books")}>
//             Explore Books
//           </button>
//         </div>
//       </motion.div>
//     </section>
//   );
// }


import hero from "../assets/hero.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      style={{
        minHeight: "100vh",
        backgroundImage: `linear-gradient(
          rgba(0,0,0,0.35),
          rgba(0,0,0,0.35)
        ), url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 20px",
      }}
    >
      <motion.div
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
        style={{
          maxWidth: "750px",
          textAlign: "center",
          background: "rgba(255,255,255,0.12)",
          backdropFilter: "blur(10px)",
          borderRadius: "25px",
          padding: "40px",
          boxShadow: "0 15px 40px rgba(0,0,0,0.3)",
        }}
      >
        <h1
          style={{
            color: "#fff",
            fontSize: "clamp(2.5rem, 6vw, 4.5rem)",
            fontWeight: "800",
            marginBottom: "15px",
            lineHeight: "1.1",
          }}
        >
          Welcome to
          <br />
          Gishmaf Global Concept
        </h1>

        <p
          style={{
            color: "#FFD700",
            fontSize: "1.3rem",
            fontWeight: "700",
            marginBottom: "20px",
          }}
        >
          Empowering Knowledge, Skills & Creativity
        </p>

        <p
          style={{
            color: "#ffffff",
            fontSize: "1.1rem",
            lineHeight: "1.8",
            marginBottom: "30px",
          }}
        >
          Discover books, learn valuable skills, stream educational content,
          explore creativity, and access resources designed to help you grow,
          succeed and thrive in today's digital world.
        </p>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "15px",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={() => navigate("/about")}
            style={{
              background: "#FFD700",
              color: "#111",
              border: "none",
              padding: "14px 28px",
              borderRadius: "50px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "16px",
            }}
          >
            Learn More
          </button>

          <button
            onClick={() => navigate("/books")}
            style={{
              background: "transparent",
              color: "#fff",
              border: "2px solid #fff",
              padding: "14px 28px",
              borderRadius: "50px",
              cursor: "pointer",
              fontWeight: "700",
              fontSize: "16px",
            }}
          >
            Explore Books
          </button>
        </div>
      </motion.div>
    </section>
  );
}
