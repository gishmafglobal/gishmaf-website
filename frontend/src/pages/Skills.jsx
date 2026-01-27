// import { useEffect, useState } from "react";

// export default function Skills() {
//   const [posts, setPosts] = useState([]);

//   useEffect(() => {
//     fetch("http://localhost:5000/posts")
//       .then(res => res.json())
//       .then(data => {
//         setPosts(data.filter(p => p.section === "skills"));
//       });
//   }, []);

//   return (
//     <div style={{ padding: "80px" }}>
//       <h1>Skill Hub</h1>
//       {posts.map(p => (
//         <div key={p._id} style={{ marginTop: "20px" }}>
//           <h2>{p.title}</h2>
//           <p>{p.content}</p>
//         </div>
//       ))}
//     </div>
//   );
// }

import logo from "../assets/logo.png";
import "./skills.css";

const skills = [
  {
    title: "Musical Instruments",
    desc: "Learn piano, guitar, drums, violin and more from beginner to advanced level.",
    img: "https://images.unsplash.com/photo-1511379938547-c1f69419868d"
  },
  {
    title: "Tech Skills",
    desc: "Web development, coding, design, AI tools, and digital skills for the future.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475"
  },
  {
    title: "Hair Making & Beauty",
    desc: "Professional hair styling, braiding, beauty care and salon techniques.",
    img: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9"
  },
  {
    title: "Tailoring & Fashion",
    desc: "Learn sewing, fashion design, clothing construction and styling.",
    img: "https://images.unsplash.com/photo-1521334884684-d80222895322"
  },
  {
    title: "Media & Content Creation",
    desc: "Photography, video editing, content creation and storytelling skills.",
    img: "https://images.unsplash.com/photo-1492724441997-5dc865305da7"
  },
  {
    title: "Entrepreneurship",
    desc: "Learn how to start, grow and manage successful businesses.",
    img: "https://images.unsplash.com/photo-1552664730-d307ca884978"
  }
];

export default function Skills() {
  return (
    <div className="hub">
      <div className="hub-header">
        <img src={logo} alt="Gishmaf Logo" />
        <h1>Gishmaf Learning Hub</h1>
        <p>Empowering skills. Unlocking potential. Building the future.</p>
      </div>

      <div className="skills-grid">
        {skills.map((skill, index) => (
          <div className="skill-card" key={index}>
            <img src={skill.img} alt={skill.title} />
            <div className="skill-content">
              <h3>{skill.title}</h3>
              <p>{skill.desc}</p>
              <button>Start Learning</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
