import hero from "../assets/hero.jpg";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section
      className="hero"
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        className="hero-content"
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1>
          Welcome to <br /> Gishmaf Global Concept
        </h1>

        <p className="gold">
          Empowering Knowledge, Skills & Creativity
        </p>

        <p>
          Discover books, learn valuable skills, and access resources designed
          to help you grow and succeed in today’s world.
        </p>

        <div style={{ marginTop: "20px" }}>
          <button
            onClick={() => navigate("/about")}
            style={{ marginRight: "10px" }}
          >
            Learn More
          </button>

          <button onClick={() => navigate("/books")}>
            Explore Books
          </button>
        </div>
      </motion.div>
    </section>
  );
}