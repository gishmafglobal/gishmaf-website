
// import Hero from "../components/Hero";
// import CardGrid from "../components/CardGrid";

// export default function Home() {
//   return (
//     <>
//       <Hero />

//       {/* 🔥 INTRO (ADSENSE BOOST) */}
//       <section style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
//         <h2>Welcome to Gishmaf Global Concept</h2>

//         <p>
//           Gishmaf Global Concept is a digital platform dedicated to empowering individuals
//           through knowledge, innovation, and creativity. We provide access to valuable
//           resources including books, skill development materials, and professional consultancy.
//         </p>

//         <p>
//           Our goal is to help individuals grow personally and professionally by offering
//           practical insights, real-life experiences, and tools that support success in today’s world.
//         </p>

//         <p>
//           Whether you are a student, entrepreneur, or lifelong learner, our platform is built
//           to guide you on your journey to self-improvement and achievement.
//         </p>
//       </section>

//       <CardGrid />

//       {/* 🔥 VALUE SECTION */}
//       <section style={{ padding: "40px 20px", background: "#0f172a", color: "#fff", marginTop: "40px" }}>
//         <div style={{ maxWidth: "900px", margin: "0 auto" }}>
//           <h2>What Makes Us Different?</h2>

//           <p>
//             At Gishmaf, we focus on delivering meaningful value. Our content is designed
//             to be practical, easy to understand, and applicable to real-life situations.
//           </p>

//           <ul style={{ lineHeight: "1.8" }}>
//             <li>✔ Practical and actionable learning resources</li>
//             <li>✔ Inspiring and transformational books</li>
//             <li>✔ Access to valuable skills and insights</li>
//             <li>✔ A growing and supportive community</li>
//           </ul>
//         </div>
//       </section>

//       {/* 🔥 TRUST SECTION */}
//       <section style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
//         <h2>Our Mission</h2>

//         <p>
//           Our mission is to educate, inspire, and empower individuals by providing access
//           to knowledge and opportunities that can transform lives.
//         </p>

//         <p>
//           We believe that the right information at the right time can change everything,
//           and we are committed to being that source of value for our users.
//         </p>
//       </section>
//     </>
//   );
// }



import { useEffect, useState } from "react";
import HeroVideo from "../assets/hero.mp4"; // 👈 add your video here
import CardGrid from "../components/CardGrid";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrollY, setScrollY] = useState(0);

  /* ================= PARALLAX + ANALYTICS ================= */
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);

    // 📊 SIMPLE ANALYTICS TRACKING (you can replace with Google Analytics later)
    console.log("Page Viewed: Home");

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={darkMode ? styles.darkApp : styles.lightApp}>

      {/* ================= THEME TOGGLE ================= */}
      <button
        onClick={() => setDarkMode(!darkMode)}
        style={styles.toggleBtn}
      >
        {darkMode ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* ================= HERO (VIDEO + PARALLAX) ================= */}
      <section style={styles.heroSection}>
        <video autoPlay muted loop playsInline style={styles.videoBg}>
          <source src={HeroVideo} type="video/mp4" />
        </video>

        <div
          style={{
            ...styles.heroOverlay,
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        />

        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Gishmaf Global Concept
          </h1>

          <p style={styles.heroText}>
            Empowering minds through knowledge, innovation, and real-world skills.
          </p>

          <a href="/contact" style={styles.heroBtn}>
            🚀 Start Your Journey
          </a>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.gradientTitle}>Who We Are</h2>

          <p style={styles.text}>
            Gishmaf Global Concept is a modern digital platform focused on empowering individuals
            with knowledge, skills, and opportunities that create real transformation.
          </p>

          <p style={styles.text}>
            We provide structured learning, professional resources, and consultancy support
            for students, entrepreneurs, and professionals worldwide.
          </p>
        </div>
      </section>

      {/* ================= CARDS ================= */}
      <section style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>Explore Our Resources</h2>
          <CardGrid />
        </div>
      </section>

      {/* ================= VALUE ================= */}
      <section style={styles.darkSection}>
        <div style={styles.container}>
          <h2 style={styles.gradientGold}>Why Choose Us</h2>

          <div style={styles.grid}>
            {[
              "✔ Practical real-world learning",
              "✔ Career-focused digital resources",
              "✔ Business & personal growth tools",
              "✔ Long-term skill development system",
              "✔ Global mindset community",
              "✔ Expert-guided learning path",
            ].map((item, i) => (
              <div key={i} style={styles.card}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.sectionTitle}>What People Say</h2>

          <div style={styles.testimonialGrid}>
            {[
              {
                name: "Amina K.",
                text: "This platform completely changed my mindset and productivity.",
              },
              {
                name: "John M.",
                text: "Very structured and practical. I finally know what to focus on.",
              },
              {
                name: "Sarah T.",
                text: "The learning approach here is extremely powerful and clear.",
              },
            ].map((t, i) => (
              <div key={i} style={styles.testimonialCard}>
                <p style={styles.quote}>“{t.text}”</p>
                <span style={styles.author}>— {t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= FOOTER CTA ================= */}
      <section style={styles.ctaSection}>
        <h2 style={styles.ctaTitle}>Ready to Transform Your Future?</h2>
        <p style={styles.ctaText}>
          Join thousands of learners building real skills and real success.
        </p>

        <a href="/contact" style={styles.ctaBtn}>
          Get Started Now
        </a>
      </section>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  /* APP THEMES */
  darkApp: {
    background: "#0b1220",
    color: "#fff",
  },

  lightApp: {
    background: "#f8fafc",
    color: "#0f172a",
  },

  /* TOGGLE */
  toggleBtn: {
    position: "fixed",
    top: "15px",
    right: "15px",
    zIndex: 999,
    padding: "10px 14px",
    borderRadius: "30px",
    border: "none",
    cursor: "pointer",
    background: "#f5b942",
    fontWeight: "bold",
  },

  /* HERO */
  heroSection: {
    position: "relative",
    height: "90vh",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },

  videoBg: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
    zIndex: 1,
  },

  heroOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.55)",
    zIndex: 2,
  },

  heroContent: {
    position: "relative",
    zIndex: 3,
    textAlign: "center",
    maxWidth: "800px",
    padding: "20px",
  },

  heroTitle: {
    fontSize: "52px",
    fontWeight: "bold",
    marginBottom: "15px",
    background: "linear-gradient(90deg,#f5b942,#ff6b6b,#4facfe)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroText: {
    fontSize: "18px",
    color: "#e2e8f0",
    marginBottom: "25px",
    lineHeight: "1.8",
  },

  heroBtn: {
    background: "#f5b942",
    color: "#000",
    padding: "14px 22px",
    borderRadius: "40px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  /* SECTIONS */
  section: {
    padding: "90px 20px",
    maxWidth: "1100px",
    margin: "auto",
    lineHeight: "1.9",
  },

  sectionAlt: {
    padding: "90px 20px",
    background: "#f1f5f9",
  },

  darkSection: {
    padding: "90px 20px",
    background: "linear-gradient(135deg,#0f172a,#111827)",
    color: "#fff",
  },

  container: {
    maxWidth: "1100px",
    margin: "auto",
  },

  sectionTitle: {
    fontSize: "34px",
    marginBottom: "25px",
    fontWeight: "bold",
  },

  gradientTitle: {
    fontSize: "38px",
    fontWeight: "bold",
    background: "linear-gradient(90deg,#f5b942,#ff6b6b)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "20px",
  },

  gradientGold: {
    fontSize: "36px",
    fontWeight: "bold",
    background: "linear-gradient(90deg,#f5b942,#fff3b0)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    marginBottom: "30px",
  },

  text: {
    fontSize: "17px",
    marginBottom: "18px",
    lineHeight: "1.9",
  },

  /* GRID */
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "18px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "18px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  /* TESTIMONIAL */
  testimonialGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))",
    gap: "20px",
  },

  testimonialCard: {
    background: "#fff",
    padding: "22px",
    borderRadius: "12px",
    border: "1px solid #e2e8f0",
  },

  quote: {
    fontSize: "15px",
    lineHeight: "1.8",
    marginBottom: "10px",
  },

  author: {
    fontWeight: "bold",
    color: "#0f172a",
  },

  /* CTA */
  ctaSection: {
    padding: "100px 20px",
    textAlign: "center",
    background: "linear-gradient(135deg,#f5b942,#ff6b6b)",
    color: "#000",
  },

  ctaTitle: {
    fontSize: "36px",
    marginBottom: "15px",
  },

  ctaText: {
    fontSize: "18px",
    marginBottom: "25px",
  },

  ctaBtn: {
    background: "#000",
    color: "#fff",
    padding: "14px 22px",
    borderRadius: "40px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};