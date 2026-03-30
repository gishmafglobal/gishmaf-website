import { useNavigate } from "react-router-dom";
import {
  FaBook,
  FaTools,
  FaMusic,
  FaEnvelope,
  FaBrain,
  FaCogs,
  FaComments,
  FaShieldAlt,
  FaFileContract,
} from "react-icons/fa";

export default function CardGrid() {
  const navigate = useNavigate();

  const cards = [
    {
      icon: <FaCogs />,
      title: "What We Do",
      description:
        "Understand our mission, vision, and how we create value through innovation and knowledge.",
      link: "/about",
    },
    {
      icon: <FaBook />,
      title: "Book Shelf",
      description:
        "Explore our collection of inspiring and educational books designed for personal growth.",
      link: "/books",
    },
    {
      icon: <FaBook />,
      title: "Blog",
      description:
        "Read insightful articles on personal growth, skills, and success strategies.",
      link: "/blog",
    },
    {
      icon: <FaBrain />,
      title: "Skill Hub",
      description:
        "Learn practical skills and gain knowledge that can help you succeed in real life.",
      link: "/skills",
    },
    {
      icon: <FaTools />,
      title: "Consultancy",
      description:
        "Access professional advice and tailored solutions for your ideas and projects.",
      link: "/consultancy",
    },
    {
      icon: <FaMusic />,
      title: "Music",
      description:
        "Enjoy inspiring and uplifting music content curated to motivate you.",
      link: "/music",
    },
    {
      icon: <FaEnvelope />,
      title: "Contact",
      description:
        "Reach out to us for inquiries, collaborations, or support.",
      link: "/contact",
    },
    {
      icon: <FaComments />,
      title: "Community",
      description:
        "Engage with others, share your thoughts, and read feedback from users.",
      link: "/comments",
    },
    {
      icon: <FaShieldAlt />,
      title: "Privacy Policy",
      description:
        "Learn how we collect, use, and protect your personal information.",
      link: "/privacy",
    },
    {
      icon: <FaFileContract />,
      title: "Terms & Conditions",
      description:
        "Read the terms governing the use of our platform and services.",
      link: "/terms",
    },
  ];

  return (
    <section className="card-grid">
      {cards.map((card, i) => (
        <div
          key={i}
          className="card"
          onClick={() => navigate(card.link)}
          style={{ cursor: "pointer" }}
        >
          <div
            style={{
              fontSize: "30px",
              marginBottom: "10px",
              color: "#f5b942",
            }}
          >
            {card.icon}
          </div>

          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </section>
  );
}