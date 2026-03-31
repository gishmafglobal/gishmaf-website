
import Hero from "../components/Hero";
import CardGrid from "../components/CardGrid";
import { Helmet } from "react-helmet";

export default function Home() {
  return (
    <>
      <Hero />

      {/* 🔥 INTRO (ADSENSE BOOST) */}
      <section style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <h2>Welcome to Gishmaf Global Concept</h2>

        <p>
          Gishmaf Global Concept is a digital platform dedicated to empowering individuals
          through knowledge, innovation, and creativity. We provide access to valuable
          resources including books, skill development materials, and professional consultancy.
        </p>

        <p>
          Our goal is to help individuals grow personally and professionally by offering
          practical insights, real-life experiences, and tools that support success in today’s world.
        </p>

        <p>
          Whether you are a student, entrepreneur, or lifelong learner, our platform is built
          to guide you on your journey to self-improvement and achievement.
        </p>
      </section>

      <CardGrid />

      {/* 🔥 VALUE SECTION */}
      <section style={{ padding: "40px 20px", background: "#0f172a", color: "#fff", marginTop: "40px" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2>What Makes Us Different?</h2>

          <p>
            At Gishmaf, we focus on delivering meaningful value. Our content is designed
            to be practical, easy to understand, and applicable to real-life situations.
          </p>

          <ul style={{ lineHeight: "1.8" }}>
            <li>✔ Practical and actionable learning resources</li>
            <li>✔ Inspiring and transformational books</li>
            <li>✔ Access to valuable skills and insights</li>
            <li>✔ A growing and supportive community</li>
          </ul>
        </div>
      </section>

      {/* 🔥 TRUST SECTION */}
      <section style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <h2>Our Mission</h2>

        <p>
          Our mission is to educate, inspire, and empower individuals by providing access
          to knowledge and opportunities that can transform lives.
        </p>

        <p>
          We believe that the right information at the right time can change everything,
          and we are committed to being that source of value for our users.
        </p>
      </section>
    </>
  );
}