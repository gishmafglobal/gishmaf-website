  
// import { Link } from "react-router-dom";
// import {
//   FaBook,
//   FaTools,
//   FaMusic,
//   FaEnvelope,
//   FaBrain,
//   FaCogs,
// } from "react-icons/fa";

// export default function CardGrid() {
//   const cards = [
//     {
//       icon: <FaCogs />,
//       title: "What We Do",
//       description:
//         "Discover the mission and vision of Gishmaf. Learn how we empower individuals through knowledge, creativity, technology, and practical solutions that impact everyday life.",
//       link: "/about",
//     },
//     {
//       icon: <FaBook />,
//       title: "Book Shelf",
//       description:
//         "Explore our curated collection of educational, inspirational, and technical books designed to expand your understanding and support personal growth.",
//       link: "/books",
//     },
//     {
//       icon: <FaBrain />,
//       title: "Skill Hub",
//       description:
//         "Access learning resources, tutorials, and practical guides that help you develop valuable skills in tech, creativity, and problem-solving.",
//       link: "/skills",
//     },
//     {
//       icon: <FaTools />,
//       title: "Consultancy",
//       description:
//         "Get professional guidance, project support, and expert advice tailored to help you bring your ideas to life and solve real-world challenges.",
//       link: "/consultancy",
//     },
//     {
//       icon: <FaMusic />,
//       title: "Music",
//       description:
//         "Experience uplifting and inspiring music content created to motivate, educate, and bring creativity into your daily life.",
//       link: "/music",
//     },
//     {
//       icon: <FaEnvelope />,
//       title: "Contact Details",
//       description:
//         "Reach out to us for inquiries, collaborations, support, or feedback. We’re always open to hearing from you and working together.",
//       link: "/contact",
//     },
//   ];

//   return (
//     <section className="card-grid">
//       {cards.map((card, i) => (
//         <Link to={card.link} key={i} className="card-link">
//           <div className="card">
//             <div
//               style={{
//                 fontSize: "30px",
//                 marginBottom: "10px",
//                 color: "#f5b942",
//               }}
//             >
//               {card.icon}
//             </div>

//             <h3>{card.title}</h3>
//             <p>{card.description}</p>
//           </div>
//         </Link>
//       ))}
//     </section>
//   );
// }

import { Link } from "react-router-dom";
import "./App.css"; 
import {
  FaBook,
  FaTools,
  FaMusic,
  FaEnvelope,
  FaBrain,
  FaCogs,
  FaComments, // ✅ comment icon
} from "react-icons/fa";

export default function CardGrid() {
  const cards = [
    {
      icon: <FaCogs />,
      title: "What We Do",
      description:
        "Discover the mission and vision of Gishmaf. Learn how we empower individuals through knowledge, creativity, technology, and practical solutions that impact everyday life.",
      link: "/about",
    },
    {
      icon: <FaBook />,
      title: "Book Shelf",
      description:
        "Explore our curated collection of educational, inspirational, and technical books designed to expand your understanding and support personal growth.",
      link: "/books",
    },
    {
      icon: <FaBrain />,
      title: "Skill Hub",
      description:
        "Access learning resources, tutorials, and practical guides that help you develop valuable skills in tech, creativity, and problem-solving.",
      link: "/skills",
    },
    {
      icon: <FaTools />,
      title: "Consultancy",
      description:
        "Get professional guidance, project support, and expert advice tailored to help you bring your ideas to life and solve real-world challenges.",
      link: "/consultancy",
    },
    {
      icon: <FaMusic />,
      title: "Music",
      description:
        "Experience uplifting and inspiring music content created to motivate, educate, and bring creativity into your daily life.",
      link: "/music",
    },
    {
      icon: <FaEnvelope />,
      title: "Contact Details",
      description:
        "Reach out to us for inquiries, collaborations, support, or feedback. We’re always open to hearing from you and working together.",
      link: "/contact",
    },
    {
      icon: <FaComments />, // ✅ NEW CARD
      title: "Community Comments",
      description:
        "Share your thoughts, feedback, and experiences with us. See what others are saying and join the public conversation.",
      link: "/comments",
    },
  ];

  return (
    <section className="card-grid">
      {cards.map((card, i) => (
        <Link to={card.link} key={i} className="card-link">
          <div className="card">
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
        </Link>
      ))}
    </section>
  );
}

