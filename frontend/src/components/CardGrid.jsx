// import { useNavigate } from "react-router-dom";
// import {
//   FaBook,
//   FaTools,
//   FaMusic,
//   FaEnvelope,
//   FaBrain,
//   FaCogs,
//   FaComments,
//   FaShieldAlt,
//   FaFileContract,
// } from "react-icons/fa";

// export default function CardGrid() {
//   const navigate = useNavigate();

//   const cards = [
//     {
//       icon: <FaCogs />,
//       title: "What We Do",
//       description:
//         "Understand our mission, vision, and how we create value through innovation and knowledge.",
//       link: "/about",
//     },
//     {
//       icon: <FaBook />,
//       title: "Book Shelf",
//       description:
//         "Explore our collection of inspiring and educational books designed for personal growth.",
//       link: "/books",
//     },
//     {
//       icon: <FaBook />,
//       title: "Blog",
//       description:
//         "Read insightful articles on personal growth, skills, and success strategies.",
//       link: "/blog",
//     },
//     {
//       icon: <FaBrain />,
//       title: "Skill Hub",
//       description:
//         "Learn practical skills and gain knowledge that can help you succeed in real life.",
//       link: "/skills",
//     },
//     {
//       icon: <FaTools />,
//       title: "Consultancy",
//       description:
//         "Access professional advice and tailored solutions for your ideas and projects.",
//       link: "/consultancy",
//     },
//     {
//       icon: <FaMusic />,
//       title: "Music",
//       description:
//         "Enjoy inspiring and uplifting music content curated to motivate you.",
//       link: "/music",
//     },
//     {
//       icon: <FaEnvelope />,
//       title: "Contact",
//       description:
//         "Reach out to us for inquiries, collaborations, or support.",
//       link: "/contact",
//     },
//     {
//       icon: <FaComments />,
//       title: "Community",
//       description:
//         "Engage with others, share your thoughts, and read feedback from users.",
//       link: "/comments",
//     },
//     {
//       icon: <FaShieldAlt />,
//       title: "Privacy Policy",
//       description:
//         "Learn how we collect, use, and protect your personal information.",
//       link: "/privacy",
//     },
//     {
//       icon: <FaFileContract />,
//       title: "Terms & Conditions",
//       description:
//         "Read the terms governing the use of our platform and services.",
//       link: "/terms",
//     },
//   ];

//   return (
//     <section className="card-grid">
//       {cards.map((card, i) => (
//         <div
//           key={i}
//           className="card"
//           onClick={() => navigate(card.link)}
//           style={{ cursor: "pointer" }}
//         >
//           <div
//             style={{
//               fontSize: "30px",
//               marginBottom: "10px",
//               color: "#f5b942",
//             }}
//           >
//             {card.icon}
//           </div>

//           <h3>{card.title}</h3>
//           <p>{card.description}</p>
//         </div>
//       ))}
//     </section>
//   );
// }



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

import hero from "../assets/hero.jpg";

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
    <section
      style={{
        backgroundImage: `url(${hero})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        padding: "80px 20px",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "rgba(0,0,0,0.55)",
          minHeight: "100vh",
          padding: "40px 20px",
          borderRadius: "20px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#fff",
            fontSize: "42px",
            marginBottom: "15px",
          }}
        >
          Explore Gishmaf Global
        </h2>

        <p
          style={{
            textAlign: "center",
            color: "#f5f5f5",
            maxWidth: "800px",
            margin: "0 auto 50px auto",
            lineHeight: "1.8",
          }}
        >
          Discover books, skills, consultancy services, music resources,
          educational content and opportunities designed to help you grow.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
            maxWidth: "1300px",
            margin: "0 auto",
          }}
        >
          {cards.map((card, i) => (
            <div
              key={i}
              onClick={() => navigate(card.link)}
              style={{
                cursor: "pointer",
                backgroundColor: "rgba(255,255,255,0.95)",
                padding: "25px",
                borderRadius: "18px",
                boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
                transition: "0.3s",
              }}
            >
              <div
                style={{
                  fontSize: "35px",
                  color: "#f5b942",
                  marginBottom: "15px",
                }}
              >
                {card.icon}
              </div>

              <h3
                style={{
                  marginBottom: "12px",
                  color: "#111",
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  color: "#555",
                  lineHeight: "1.7",
                }}
              >
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

