
// import { useNavigate } from "react-router-dom";
// import {
//   FaBook,
//   FaTools,
//   FaMusic,
//   FaEnvelope,
//   FaBrain,
//   FaCogs,
//   FaComments,
// } from "react-icons/fa";

// export default function CardGrid() {
//   const navigate = useNavigate();

//   const cards = [
//     {
//       icon: <FaCogs />,
//       title: "What We Do",
//       description:
//         "Discover the mission and vision of Gishmaf.",
//       link: "/about",
//     },
//     {
//       icon: <FaBook />,
//       title: "Book Shelf",
//       description:
//         "Explore our curated collection of books.",
//       link: "/books",
//     },
//     {
//       icon: <FaBrain />,
//       title: "Skill Hub",
//       description:
//         "Access learning resources and practical guides.",
//       link: "/skills",
//     },
//     {
//       icon: <FaTools />,
//       title: "Consultancy",
//       description:
//         "Get professional guidance and project support.",
//       link: "/consultancy",
//     },
//     {
//       icon: <FaMusic />,
//       title: "Music",
//       description:
//         "Experience uplifting and inspiring music content.",
//       link: "/music",
//     },
//     {
//       icon: <FaEnvelope />,
//       title: "Contact Details",
//       description:
//         "Reach out to us for inquiries and feedback.",
//       link: "/contact",
//     },
//     {
//       icon: <FaComments />,
//       title: "Community Comments",
//       description:
//         "Read what others are saying and drop your own comment.",
//       link: "/comments",
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
} from "react-icons/fa";

export default function CardGrid() {
  const navigate = useNavigate();

  const cards = [
    {
      icon: <FaCogs />,
      title: "What We Do",
      description:
        "Learn about Gishmaf’s mission, vision, and the value we bring through innovation and creativity.",
      link: "/about",
    },
    {
      icon: <FaBook />,
      title: "Book Shelf",
      description:
        "Browse our carefully selected collection of books designed to educate, inspire, and empower you.",
      link: "/books",
    },
    {
      icon: <FaBrain />,
      title: "Skill Hub",
      description:
        "Gain access to practical knowledge, tutorials, and resources to build valuable real-world skills.",
      link: "/skills",
    },
    {
      icon: <FaTools />,
      title: "Consultancy",
      description:
        "Get expert advice, tailored solutions, and professional support for your projects and ideas.",
      link: "/consultancy",
    },
    {
      icon: <FaMusic />,
      title: "Music",
      description:
        "Enjoy uplifting and inspiring music content created to motivate and elevate your experience.",
      link: "/music",
    },
    {
      icon: <FaEnvelope />,
      title: "Contact",
      description:
        "Reach out to us for inquiries, partnerships, or support—we’re always ready to connect.",
      link: "/contact",
    },
    {
      icon: <FaComments />,
      title: "Community",
      description:
        "Join the conversation—read feedback, share your thoughts, and engage with others.",
      link: "/comments",
    },
    {
      icon: <FaShieldAlt />,
      title: "Privacy Policy",
      description:
        "Understand how we collect, use, and protect your information while you use our platform.",
      link: "/privacy",
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