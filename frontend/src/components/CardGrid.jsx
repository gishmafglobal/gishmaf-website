
  
// import { FaBook, FaTools, FaMusic, FaEnvelope, FaBrain, FaCogs } from "react-icons/fa";

// export default function CardGrid() {
//   const cards = [
//     { icon: <FaCogs />, title: "What We Do" },
//     { icon: <FaBook />, title: "Book Shelf" },
//     { icon: <FaBrain />, title: "Skill Hub" },
//     { icon: <FaTools />, title: "Consultancy" },
//     { icon: <FaMusic />, title: "Music" },
//     { icon: <FaEnvelope />, title: "Contact Details" },
//   ];

//   return (
//     <section className="card-grid">
//       {cards.map((card, i) => (
//         <div className="card" key={i}>
//           <div style={{ fontSize: "30px", marginBottom: "10px", color: "#f5b942" }}>
//             {card.icon}
//           </div>
//           <h3>{card.title}</h3>
//           <p>Lorem ipsum description here.</p>
//         </div>
//       ))}
//     </section>
//   );
// }

import {
    FaBook,
    FaTools,
    FaMusic,
    FaEnvelope,
    FaBrain,
    FaCogs,
  } from "react-icons/fa";
  
  export default function CardGrid() {
    const cards = [
      {
        icon: <FaCogs />,
        title: "What We Do",
        description:
          "Discover the mission and vision of Gishmaf. Learn how we empower individuals through knowledge, creativity, technology, and practical solutions that impact everyday life.",
      },
      {
        icon: <FaBook />,
        title: "Book Shelf",
        description:
          "Explore our curated collection of educational, inspirational, and technical books designed to expand your understanding and support personal growth.",
      },
      {
        icon: <FaBrain />,
        title: "Skill Hub",
        description:
          "Access learning resources, tutorials, and practical guides that help you develop valuable skills in tech, creativity, and problem-solving.",
      },
      {
        icon: <FaTools />,
        title: "Consultancy",
        description:
          "Get professional guidance, project support, and expert advice tailored to help you bring your ideas to life and solve real-world challenges.",
      },
      {
        icon: <FaMusic />,
        title: "Music",
        description:
          "Experience uplifting and inspiring music content created to motivate, educate, and bring creativity into your daily life.",
      },
      {
        icon: <FaEnvelope />,
        title: "Contact Details",
        description:
          "Reach out to us for inquiries, collaborations, support, or feedback. We’re always open to hearing from you and working together.",
      },
    ];
  
    return (
      <section className="card-grid">
        {cards.map((card, i) => (
          <div className="card" key={i}>
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
  
