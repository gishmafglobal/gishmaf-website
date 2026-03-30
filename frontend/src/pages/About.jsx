import AboutDisplay from "../components/AboutDisplay";

export default function About() {
  return (
    <div>
      {/* 🔥 Animated Section */}
      <AboutDisplay />

      {/* 🔥 PROFESSIONAL CONTENT */}
      <section style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
        <h1>About Gishmaf Global Concept</h1>

        <p>
          Gishmaf Global Concept is a forward-thinking digital platform focused on
          empowering individuals and organizations through knowledge, technology,
          creativity, and innovation.
        </p>

        <p>
          We provide access to valuable resources including educational content,
          curated books, skill development materials, and professional consultancy
          services designed to support personal and professional growth.
        </p>

        <h2 style={{ marginTop: "30px" }}>Our Mission</h2>
        <p>
          Our mission is to equip individuals with the knowledge, skills, and tools
          needed to succeed in a rapidly evolving world by delivering practical,
          accessible, and impactful content.
        </p>

        <h2 style={{ marginTop: "30px" }}>Our Vision</h2>
        <p>
          Our vision is to become a trusted global platform where individuals can learn,
          grow, and transform their ideas into meaningful achievements and real-world success.
        </p>

        <h2 style={{ marginTop: "30px" }}>What We Offer</h2>
        <ul style={{ lineHeight: "1.8" }}>
          <li>✔ Educational and inspirational books</li>
          <li>✔ Skill development resources and learning materials</li>
          <li>✔ Consultancy and professional guidance</li>
          <li>✔ Creative and engaging digital content</li>
        </ul>

        <h2 style={{ marginTop: "30px" }}>Why Choose Us</h2>
        <p>
          At Gishmaf Global Concept, we are committed to delivering real value.
          Our content is designed to be practical, easy to understand, and applicable
          to real-life situations. We focus on helping individuals take meaningful
          steps toward growth, innovation, and long-term success.
        </p>

        {/* 🔥 NEW FOUNDER SECTION */}
        <h2 style={{ marginTop: "30px" }}>Our Founder</h2>
        <p>
          Founded by Gabriel M. Gishmaf, Gishmaf Global Concept was created to empower
          individuals and organizations through access to knowledge, practical skills,
          and innovative thinking.
        </p>

        <p>
          Driven by a strong passion for growth and transformation, Gabriel established
          the platform to bridge the gap between ideas and execution by providing
          meaningful resources that support personal and professional development.
        </p>

        <p>
          Through a combination of educational content, curated books, skill development
          materials, and consultancy services, the platform aims to inspire creativity,
          encourage continuous learning, and equip individuals with the tools needed
          to succeed in today’s evolving world.
        </p>

        <p>
          His vision is to build a trusted and impactful platform where knowledge meets
          purpose, and where individuals are empowered to turn their ideas into reality.
        </p>

        <h2 style={{ marginTop: "30px" }}>Contact Information</h2>
        <p>
          For inquiries, partnerships, or support, please visit our Contact page.
        </p>
      </section>
    </div>
  );
}