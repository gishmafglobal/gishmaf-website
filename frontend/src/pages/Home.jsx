
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
          <span style={styles.badge}>Welcome</span>

          <h2 style={styles.gradientText}>
            Gishmaf Global Concept
          </h2>

          <p style={styles.text}>
            A modern digital platform dedicated to empowering individuals through knowledge,
            innovation, and creativity.
          </p>

          <p style={styles.text}>
            We provide access to books, skill development tools, and consultancy services
            designed to support personal and professional growth.
          </p>

          <p style={styles.text}>
            Whether you're a student, entrepreneur, or lifelong learner — we help you grow.
          </p>
        </div>
      </section>

      {/* ================= CARDS ================= */}
      <section className="section reveal" style={styles.lightSection}>
        <div style={styles.container}>
          <h2 style={styles.title}>Explore Powerful Resources</h2>
          <CardGrid />
        </div>
      </section>

      {/* ================= VALUE SECTION ================= */}
      <section className="section reveal" style={styles.darkSection}>
        <div style={styles.container}>
          <span style={styles.badgeDark}>Why Choose Us</span>

          <h2 style={styles.gradientTextGold}>
            What Makes Us Different?
          </h2>

          <p style={styles.textLight}>
            We focus on practical learning that creates real-world impact.
          </p>

          <div style={styles.grid}>
            {[
              "✔ Practical and actionable learning",
              "✔ Transformational digital books",
              "✔ Real-world skill development",
              "✔ Supportive learning community",
            ].map((item, i) => (
              <div key={i} style={styles.card}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="section reveal">
        <div style={styles.container}>
          <h2 style={styles.title}>What People Say</h2>

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
                <p style={styles.quote}>"{t.text}"</p>
                <span style={styles.author}>— {t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= MISSION ================= */}
      <section className="section reveal" style={styles.lightSection}>
        <div style={styles.container}>
          <span style={styles.badge}>Our Mission</span>

          <h2 style={styles.title}>We Empower Growth</h2>

          <p style={styles.text}>
            Our mission is to educate, inspire, and empower individuals through access to knowledge
            and opportunities that transform lives.
          </p>
        </div>
      </section>

      {/* FLOATING CTA BUTTON */}
      <a href="/contact" style={styles.floatingBtn}>
        🚀 Start Now
      </a>

      {/* ANIMATION CSS */}
      <style>{`
        .section {
          padding: 80px 20px;
          max-width: 1100px;
          margin: auto;
        }

        .reveal {
          opacity: 0;
          transform: translateY(40px);
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
    maxWidth: "1000px",
    margin: "auto",
  },

  lightSection: {
    background: "#f8fafc",
  },

  darkSection: {
    background: "linear-gradient(135deg, #0f172a, #111827)",
    color: "#fff",
  },

  badge: {
    background: "#f5b942",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
  },

  badgeDark: {
    background: "#f5b942",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: "bold",
    color: "#000",
  },

  title: {
    fontSize: "28px",
    marginTop: "10px",
    marginBottom: "20px",
    color: "#0f172a",
  },

  text: {
    fontSize: "15px",
    lineHeight: "1.8",
    color: "#334155",
  },

  textLight: {
    fontSize: "15px",
    lineHeight: "1.8",
    color: "#cbd5e1",
  },

  /* 🌈 GRADIENT TEXT */
  gradientText: {
    fontSize: "34px",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #f5b942, #ff6b6b, #4facfe)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "15px 0",
  },

  gradientTextGold: {
    fontSize: "30px",
    fontWeight: "bold",
    background: "linear-gradient(90deg, #f5b942, #fff3b0)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
    margin: "15px 0",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  card: {
    background: "rgba(255,255,255,0.05)",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid rgba(255,255,255,0.1)",
    backdropFilter: "blur(10px)",
  },

  testimonialGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },

  testimonialCard: {
    padding: "20px",
    borderRadius: "12px",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
  },

  quote: {
    fontSize: "14px",
    lineHeight: "1.6",
    marginBottom: "10px",
  },

  author: {
    fontSize: "13px",
    fontWeight: "bold",
    color: "#0f172a",
  },

  floatingBtn: {
    position: "fixed",
    bottom: "25px",
    right: "25px",
    background: "#f5b942",
    color: "#000",
    padding: "12px 18px",
    borderRadius: "50px",
    textDecoration: "none",
    fontWeight: "bold",
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    zIndex: 999,
  },
};