
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
import HeroVideo from "../assets/hero.mp4";
import CardGrid from "../components/CardGrid";

export default function Home() {
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const items = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.12 }
    );

    items.forEach((el) => observer.observe(el));

    console.log("📊 Analytics: Home Page Loaded");

    return () => observer.disconnect();
  }, []);

  return (
    <div style={dark ? styles.darkApp : styles.lightApp}>

      {/* ================= TOGGLE ================= */}
      <button onClick={() => setDark(!dark)} style={styles.toggle}>
        {dark ? "☀ Light Mode" : "🌙 Dark Mode"}
      </button>

      {/* ================= HERO ================= */}
      <section style={styles.hero}>
        <video autoPlay muted loop playsInline style={styles.video}>
          <source src={HeroVideo} type="video/mp4" />
        </video>

        <div style={styles.heroOverlay}></div>

        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>
            Gishmaf Global Concept
          </h1>

          <p style={styles.heroSubtitle}>
            A modern platform for learning, growth, and real-world transformation.
          </p>

          <a href="/contact" style={styles.heroBtn}>
            🚀 Start Learning Today
          </a>
        </div>
      </section>

      {/* ================= INTRO ================= */}
      <section className="reveal" style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.title}>Who We Are</h2>

          <p style={styles.text}>
            Gishmaf Global Concept is a digital learning ecosystem built to empower individuals
            with knowledge, skills, and opportunities that lead to real transformation.
          </p>

          <p style={styles.text}>
            We focus on practical education, real-world application, and personal development
            for students, professionals, and entrepreneurs.
          </p>
        </div>
      </section>

      {/* ================= CARDS ================= */}
      <section className="reveal" style={styles.sectionAlt}>
        <div style={styles.container}>
          <h2 style={styles.titleDark}>Explore Our Resources</h2>
          <CardGrid />
        </div>
      </section>

      {/* ================= VALUE ================= */}
      <section className="reveal" style={styles.darkSection}>
        <div style={styles.container}>
          <h2 style={styles.gradientGold}>Why Choose Us</h2>

          <div style={styles.grid}>
            {[
              "✔ Practical, real-world learning",
              "✔ Career-focused digital resources",
              "✔ Skill-building programs",
              "✔ Growth-oriented community",
              "✔ Simple and structured learning",
              "✔ Long-term value system",
            ].map((item, i) => (
              <div key={i} style={styles.card}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="reveal" style={styles.section}>
        <div style={styles.container}>
          <h2 style={styles.title}>What People Say</h2>

          <div style={styles.testGrid}>
            {[
              {
                name: "Amina K.",
                text: "This platform gave me clarity and direction in my learning journey.",
              },
              {
                name: "John M.",
                text: "Very structured and easy to follow. High-quality content.",
              },
              {
                name: "Sarah T.",
                text: "I finally feel like I’m building real skills that matter.",
              },
            ].map((t, i) => (
              <div key={i} style={styles.testCard}>
                <p style={styles.quote}>“{t.text}”</p>
                <b style={styles.author}>{t.name}</b>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section style={styles.cta}>
        <h2 style={styles.ctaTitle}>Ready to Transform Your Future?</h2>
        <p style={styles.ctaText}>
          Join a growing community of learners building real-world skills.
        </p>

        <a href="/contact" style={styles.ctaBtn}>
          Get Started
        </a>
      </section>

      {/* ================= ANIMATION ================= */}
      <style>{`
        .reveal {
          opacity: 0;
          transform: translateY(25px);
          transition: all 0.7s ease;
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </div>
  );
}

/* ================= STYLES ================= */

const styles = {
  darkApp: {
    background: "#0b1220",
    color: "#f8fafc",
    minHeight: "100vh",
  },

  lightApp: {
    background: "#ffffff",
    color: "#0f172a",
    minHeight: "100vh",
  },

  toggle: {
    position: "fixed",
    top: 15,
    right: 15,
    zIndex: 999,
    padding: "10px 14px",
    borderRadius: "30px",
    border: "none",
    background: "#f5b942",
    fontWeight: "bold",
    cursor: "pointer",
  },

  hero: {
    height: "90vh",
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },

  video: {
    position: "absolute",
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },

  heroOverlay: {
    position: "absolute",
    width: "100%",
    height: "100%",
    background: "rgba(0,0,0,0.55)",
  },

  heroContent: {
    position: "relative",
    textAlign: "center",
    maxWidth: "800px",
    padding: "20px",
  },

  heroTitle: {
    fontSize: "48px",
    fontWeight: "bold",
    background: "linear-gradient(90deg,#f5b942,#ff6b6b,#4facfe)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  heroSubtitle: {
    fontSize: "18px",
    marginTop: "12px",
    marginBottom: "25px",
    color: "#e2e8f0",
    lineHeight: "1.7",
  },

  heroBtn: {
    padding: "12px 22px",
    background: "#f5b942",
    color: "#000",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "bold",
  },

  section: {
    padding: "90px 20px",
    maxWidth: "1100px",
    margin: "auto",
  },

  sectionAlt: {
    padding: "90px 20px",
    background: "#f1f5f9",
  },

  darkSection: {
    padding: "90px 20px",
    background: "#0f172a",
    color: "#fff",
  },

  container: {
    maxWidth: "1100px",
    margin: "auto",
  },

  title: {
    fontSize: "32px",
    marginBottom: "20px",
    fontWeight: "bold",
  },

  titleDark: {
    fontSize: "32px",
    marginBottom: "20px",
    fontWeight: "bold",
    color: "#0f172a",
  },

  text: {
    fontSize: "16px",
    lineHeight: "1.9",
    marginBottom: "15px",
    color: "inherit",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "16px",
    borderRadius: "12px",
    border: "1px solid rgba(255,255,255,0.1)",
  },

  testGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(240px,1fr))",
    gap: "15px",
  },

  testCard: {
    background: "#fff",
    padding: "18px",
    borderRadius: "12px",
    color: "#0f172a",
    border: "1px solid #e2e8f0",
  },

  quote: {
    fontStyle: "italic",
    marginBottom: "10px",
    lineHeight: "1.7",
  },

  author: {
    color: "#0f172a",
  },

  cta: {
    padding: "100px 20px",
    textAlign: "center",
    background: "linear-gradient(135deg,#f5b942,#ff6b6b)",
    color: "#000",
  },

  ctaTitle: {
    fontSize: "34px",
    marginBottom: "10px",
  },

  ctaText: {
    fontSize: "18px",
    marginBottom: "20px",
  },

  ctaBtn: {
    padding: "12px 22px",
    background: "#000",
    color: "#fff",
    borderRadius: "30px",
    textDecoration: "none",
    fontWeight: "bold",
  },
};