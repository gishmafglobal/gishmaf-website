
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

import { useEffect } from "react";
import Hero from "../components/Hero";
import CardGrid from "../components/CardGrid";

export default function Home() {
  useEffect(() => {
    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("active");
          }
        });
      },
      { threshold: 0.15 }
    );

    elements.forEach((el) => observer.observe(el));
  }, []);

  return (
    <>
      <Hero />

      {/* ================= INTRO ================= */}
      <section className="section reveal">
        <div style={styles.container}>
          <span style={styles.badge}>✨ Welcome</span>

          <h2 style={styles.gradientText}>
            Gishmaf Global Concept
          </h2>

          <p style={styles.textDark}>
            A modern digital platform dedicated to empowering individuals through knowledge,
            innovation, and creativity.
          </p>

          <p style={styles.textDark}>
            We provide access to structured learning, skill development tools, and consultancy
            services designed for real-world success.
          </p>

          <p style={styles.textDark}>
            Whether you're a student, entrepreneur, or lifelong learner — we help you grow.
          </p>
        </div>
      </section>

      {/* ================= CARDS ================= */}
      <section className="section reveal" style={styles.lightSection}>
        <div style={styles.container}>
          <h2 style={styles.titleDark}>📚 Explore Powerful Resources</h2>
          <CardGrid />
        </div>
      </section>

      {/* ================= VALUE SECTION ================= */}
      <section className="section reveal" style={styles.darkSection}>
        <div style={styles.container}>
          <span style={styles.badgeDark}>💡 Why Choose Us</span>

          <h2 style={styles.gradientTextGold}>
            What Makes Us Different?
          </h2>

          <p style={styles.textLight}>
            We focus on practical learning that creates real-world impact.
          </p>

          <div style={styles.grid}>
            {[
              "✔ Practical & actionable learning",
              "✔ Real-world skill development",
              "✔ Transformational digital content",
              "✔ Supportive global community",
            ].map((item, i) => (
              <div key={i} style={styles.card}>
                <span style={styles.icon}>⚡</span>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="section reveal">
        <div style={styles.container}>
          <h2 style={styles.titleDark}>💬 What People Say</h2>

          <div style={styles.testimonialGrid}>
            {[
              {
                name: "Amina K.",
                text: "This platform completely changed how I learn and grow professionally.",
              },
              {
                name: "John M.",
                text: "Very practical and easy to understand. The resources are top quality.",
              },
              {
                name: "Sarah T.",
                text: "I gained real skills I now use in my business every day.",
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

      {/* ================= MISSION ================= */}
      <section className="section reveal" style={styles.lightSection}>
        <div style={styles.container}>
          <span style={styles.badge}>🎯 Our Mission</span>

          <h2 style={styles.titleDark}>We Empower Growth</h2>

          <p style={styles.textDark}>
            Our mission is to educate, inspire, and empower individuals through access to knowledge
            and opportunities that transform lives.
          </p>
        </div>
      </section>

      {/* FLOATING CTA */}
      <a href="/contact" style={styles.floatingBtn}>
        🚀 Start Now
      </a>

      {/* ANIMATION */}
      <style>{`
        .section {
          padding: 95px 20px;
          max-width: 1100px;
          margin: auto;
        }

        .reveal {
          opacity: 0;
          transform: translateY(35px);
          transition: all 0.8s ease;
        }

        .reveal.active {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </>
  );
}

/* ================= INLINE STYLES ================= */

const styles = {
  container: {
    maxWidth: "1050px",
    margin: "auto",
  },

  lightSection: {
    background: "#f8fafc",
    borderTop: "1px solid #e5e7eb",
    borderBottom: "1px solid #e5e7eb",
  },

  darkSection: {
    background: "linear-gradient(135deg, #0f172a, #111827)",
    color: "#fff",
  },

  badge: {
    background: "#f5b942",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#000",
  },

  badgeDark: {
    background: "#f5b942",
    padding: "6px 14px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#000",
  },

  /* STRONG TEXT (FIXED VISIBILITY ISSUE) */
  textDark: {
    fontSize: "16.5px",
    lineHeight: "1.9",
    color: "#1f2937", // VERY IMPORTANT FIX (dark readable text)
    marginBottom: "14px",
  },

  textLight: {
    fontSize: "16px",
    lineHeight: "1.9",
    color: "#d1d5db",
    marginBottom: "14px",
  },

  titleDark: {
    fontSize: "30px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "20px",
  },

  gradientText: {
    fontSize: "38px",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #f5b942, #ff6b6b, #4facfe)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "18px 0",
  },

  gradientTextGold: {
    fontSize: "34px",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #f5b942, #fff3b0)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "18px 0",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
    gap: "16px",
    marginTop: "25px",
  },

  /* 🔥 IMPROVED CARD */
  card: {
    background: "rgba(255,255,255,0.08)",
    padding: "18px",
    borderRadius: "14px",
    border: "1px solid rgba(255,255,255,0.15)",
    backdropFilter: "blur(10px)",
    display: "flex",
    alignItems: "center",
    gap: "10px",
    fontSize: "15px",
  },

  icon: {
    fontSize: "22px",
    color: "#f5b942",
  },

  testimonialGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "18px",
  },

  testimonialCard: {
    padding: "20px",
    borderRadius: "14px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    boxShadow: "0 8px 20px rgba(0,0,0,0.06)",
  },

  quote: {
    fontSize: "15px",
    lineHeight: "1.7",
    color: "#111827",
    marginBottom: "12px",
  },

  author: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#374151",
  },

  floatingBtn: {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    background: "#f5b942",
    color: "#000",
    padding: "13px 18px",
    borderRadius: "50px",
    textDecoration: "none",
    fontWeight: "bold",
    boxShadow: "0 10px 25px rgba(0,0,0,0.25)",
    zIndex: 999,
  },
};