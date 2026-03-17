// import hero from "../assets/hero.jpg";

// export default function Hero() {
//   return (
//     <section className="hero" style={{ backgroundImage: `url(${hero})` }}>
//       <div className="hero-content">
//         <h2>Welcome to <br /> Gishmaf Global Concept!</h2>
//         <p className="gold">Empowering Tech, Knowledge & Creativity.</p>
//         <p>Bringing Your Ideas to Life!</p>
//         <button>Get Started</button>
//       </div>
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
      className="hero"
      style={{ backgroundImage: `url(${hero})` }}
    >
      <motion.div
        className="hero-content"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h2>
          Welcome to <br /> Gishmaf Global Concept!
        </h2>

        <p className="gold">
          Empowering Tech, Knowledge & Creativity.
        </p>

        <p>Bringing Your Ideas to Life!</p>

        <button onClick={() => navigate("/about")}>
          Get Started
        </button>
      </motion.div>
    </section>
  );
}
