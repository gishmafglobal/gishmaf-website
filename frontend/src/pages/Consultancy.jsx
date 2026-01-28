
import logo from "../assets/logo.png";
import "./consultancy.css";

export default function Consultancy() {
  return (
    <div className="consultancy-page">
      <div className="consultancy-header">
        <img src={logo} alt="Gishmaf Logo" />
        <h1>Gishmaf Global Concept Consultancy</h1>
        <p>
          Guiding ideas into reality through knowledge, creativity, and technology.
        </p>
      </div>

      <div className="consultancy-content">
        <p>
          Gishmaf Global Concept is more than a platform — it is a vision-driven
          hub dedicated to empowering individuals, creatives, entrepreneurs, and
          organizations through innovation, learning, and strategic guidance.
        </p>

        <p>
          Our consultancy services are designed to help you move from ideas to
          execution. Whether you are looking to develop digital skills, start a
          creative project, build a business, learn a craft, or expand your
          knowledge, we provide the guidance, structure, and support needed to
          make it happen.
        </p>

        <p>
          At Gishmaf, we specialize in areas such as technology development,
          skill acquisition, media production, creative arts, entrepreneurship,
          fashion, beauty, and educational empowerment. Our goal is to equip you
          with practical knowledge and actionable strategies that lead to real
          growth and transformation.
        </p>

        <p>
          This platform reflects our commitment to building a community where
          learning meets purpose and creativity meets opportunity.
        </p>
      </div>

      <div className="consultancy-contact">
        <h2>Book a Session / Reach Out</h2>
        <p>
          For quick response and to schedule consultancy sessions, reach us via:
        </p>

        <div className="emails">
          <a href="mailto:info@gishmafglobal.com">info@gishmafglobal.com</a>
          <a href="mailto:gishmafglobalcompany@gmail.com">
            gishmafglobalcompany@gmail.com
          </a>
          <a href="mailto:gishmafglobal@gmail.com">
            gishmafglobal@gmail.com
          </a>
        </div>
      </div>
    </div>
  );
}
